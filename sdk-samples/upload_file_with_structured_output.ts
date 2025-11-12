

import {ContentListUnion, createPartFromUri, GoogleGenAI, Type} from '@google/genai';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GOOGLE_GENAI_USE_VERTEXAI = process.env.GOOGLE_GENAI_USE_VERTEXAI;

async function uploadFileWithStructuredOutput() {
  // Check for required environment variables
  if (!GEMINI_API_KEY) {
    console.error('❌ GEMINI_API_KEY environment variable is not set.');
    console.error('Please set it with: export GEMINI_API_KEY=your-api-key');
    return;
  }

  try {
    // Initialize the Gemini API client
    const ai = new GoogleGenAI({vertexai: false, apiKey: GEMINI_API_KEY});

    // Step 1: Create a sample file with story content
    console.log('📄 Creating sample file...');
    const testFile = new Blob(
      [
        'The Whispering Woods In the heart of Eldergrove, there stood a forest whispered about by the villagers. They spoke of trees that could talk and streams that sang. Young Elara, curious and adventurous, decided to explore the woods one crisp autumn morning. As she wandered deeper, the leaves rustled with excitement, revealing hidden paths. Elara noticed the trees bending slightly as if beckoning her to come closer. When she paused to listen, she heard soft murmurs—stories of lost treasures and forgotten dreams. Drawn by the enchanting sounds, she followed a narrow trail until she stumbled upon a shimmering pond. At its edge, a wise old willow tree spoke, "Child of the village, what do you seek?" "I seek adventure," Elara replied, her heart racing. "Adventure lies not in faraway lands but within your spirit," the willow said, swaying gently. "Every choice you make is a step into the unknown." With newfound courage, Elara left the woods, her mind buzzing with possibilities. The villagers would say the woods were magical, but to Elara, it was the spark of her imagination that had transformed her ordinary world into a realm of endless adventures. She smiled, knowing her journey was just beginning',
      ],
      {type: 'text/plain'},
    );

    // Step 2: Upload the file
    console.log('⬆️  Uploading file...');
    const file = await ai.files.upload({
      file: testFile,
      config: {
        displayName: 'story_analysis.txt',
      },
    });
    console.log(`✓ File uploaded: ${file.name}`);

    // Step 3: Wait for the file to be processed
    console.log('⏳ Waiting for file processing...');
    let fileMetadata = await ai.files.get({name: file.name as string});
    while (fileMetadata.state === 'PROCESSING') {
      console.log(`   Current status: ${fileMetadata.state}`);
      await new Promise((resolve) => {
        setTimeout(resolve, 2000);
      });
      fileMetadata = await ai.files.get({name: file.name as string});
    }

    if (fileMetadata.state === 'FAILED') {
      throw new Error('File processing failed.');
    }
    console.log('✓ File processing complete');

    // Step 4: Create file reference and build content
    const content: ContentListUnion = [
      'Analyze this story and extract structured information about the characters, setting, and themes.',
    ];

    if (file.uri && file.mimeType) {
      const filePart = createPartFromUri(file.uri, file.mimeType);
      content.push(filePart);
    }

    // Step 5: Define the response schema for structured output
    const responseSchema = {
      type: Type.OBJECT,
      properties: {
        title: {
          type: Type.STRING,
          description: 'The title of the story',
        },
        characters: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              name: {
                type: Type.STRING,
                description: 'Character name',
              },
              role: {
                type: Type.STRING,
                description: 'Character role in the story',
              },
            },
            required: ['name', 'role'],
          },
          description: 'List of main characters',
        },
        setting: {
          type: Type.OBJECT,
          properties: {
            location: {
              type: Type.STRING,
              description: 'Primary location',
            },
            time: {
              type: Type.STRING,
              description: 'Time period or season',
            },
          },
          required: ['location'],
        },
        themes: {
          type: Type.ARRAY,
          items: {
            type: Type.STRING,
          },
          description: 'Main themes of the story',
        },
        summary: {
          type: Type.STRING,
          description: 'One sentence summary',
        },
      },
      required: ['title', 'characters', 'setting', 'themes', 'summary'],
    };

    // Step 6: Generate content with structured output
    console.log('🔍 Analyzing file and generating structured output...');
    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: content,
      config: {
        responseMimeType: 'application/json',
        responseSchema: responseSchema,
      },
    });

    // Step 7: Display the structured result
    console.log('\n✅ Analysis complete! Structured output:\n');
    const structuredData = JSON.parse(response.text);
    console.log(JSON.stringify(structuredData, null, 2));

    // Step 8: Clean up - delete the uploaded file
    console.log('\n🗑️  Cleaning up...');
    await ai.files.delete({name: file.name as string});
    console.log('✓ File deleted successfully');

  } catch (error) {
    console.error('\n❌ Error occurred:', error);
    if (error instanceof Error) {
      console.error('Error message:', error.message);
    }
    throw error;
  }
}

async function main() {
  if (GOOGLE_GENAI_USE_VERTEXAI === 'true') {
    console.log('⚠️  Vertex AI is not supported for this sample.');
    console.log('This feature requires Gemini Developer API.');
    return;
  }

  await uploadFileWithStructuredOutput();
}

main();
