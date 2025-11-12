/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * This sample demonstrates how to upload a file to the Gemini API,
 * retrieve its metadata, and download its content.
 *
 * Key concepts:
 * - Upload files using ai.files.upload()
 * - Get file metadata with ai.files.get()
 * - Download file content to disk using ai.files.download()
 * - Wait for file processing to complete before using it
 *
 * Note: File operations are only supported on Gemini Developer API,
 * not on Vertex AI. For Vertex AI, use GCS buckets to share files.
 */

import { GoogleGenAI } from '@google/genai';
import { readFile } from 'fs/promises';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GOOGLE_GENAI_USE_VERTEXAI = process.env.GOOGLE_GENAI_USE_VERTEXAI;

async function uploadAndRetrieveFile() {
    // Initialize the client for Gemini Developer API
    const ai = new GoogleGenAI({ vertexai: false, apiKey: GEMINI_API_KEY });

    try {
        // Step 1: Create a sample file to upload
        console.log('Creating sample file content...');
        const sampleContent =
            'This is a sample text file demonstrating file upload and retrieval.\n' +
            'The Gemini API allows you to upload files and reference them in your prompts.\n' +
            'This is useful for:\n' +
            '- Analyzing documents\n' +
            '- Processing images\n' +
            '- Working with audio files\n' +
            '- And more!';

        const fileBlob = new Blob([sampleContent], { type: 'text/plain' });

        // Step 2: Upload the file to Gemini API
        console.log('\nUploading file to Gemini API...');
        const uploadedFile = await ai.files.upload({
            file: fileBlob,
            config: {
                displayName: 'sample_document.txt',
                mimeType: 'text/plain',
            },
        });

        console.log(`✓ File uploaded successfully!`);
        console.log(`  File name: ${uploadedFile.name}`);
        console.log(`  Display name: ${uploadedFile.displayName}`);
        console.log(`  MIME type: ${uploadedFile.mimeType}`);
        console.log(`  Size: ${uploadedFile.sizeBytes} bytes`);
        console.log(`  Initial state: ${uploadedFile.state}`);

        // Step 3: Wait for file processing to complete
        console.log('\nWaiting for file to be processed...');
        let fileMetadata = await ai.files.get({ name: uploadedFile.name as string });

        while (fileMetadata.state === 'PROCESSING') {
            console.log('  File is still processing...');
            await new Promise((resolve) => setTimeout(resolve, 2000));
            fileMetadata = await ai.files.get({ name: uploadedFile.name as string });
        }

        if (fileMetadata.state === 'FAILED') {
            throw new Error('File processing failed.');
        }

        console.log(`✓ File processing complete!`);
        console.log(`  Final state: ${fileMetadata.state}`);
        console.log(`  URI: ${fileMetadata.uri}`);

        // Step 4: Download the file content
        const downloadPath = './downloaded_file.txt';
        console.log(`\nDownloading file to ${downloadPath}...`);

        await ai.files.download({
            file: uploadedFile.name as string,
            downloadPath: downloadPath,
        });

        console.log('✓ File downloaded successfully!');

        // Step 5: Read and display the downloaded content
        console.log('\nReading downloaded file content:');
        const downloadedContent = await readFile(downloadPath, 'utf-8');
        console.log('--- File Content Start ---');
        console.log(downloadedContent);
        console.log('--- File Content End ---');

        // Step 6: List all files (optional)
        console.log('\nListing all files in your project:');
        const fileList = await ai.files.list({ config: { pageSize: 5 } });
        let count = 0;
        for await (const file of fileList) {
            count++;
            console.log(`  ${count}. ${file.displayName} (${file.name})`);
            if (count >= 5) break; // Show only first 5 files
        }

        // Step 7: Clean up - delete the uploaded file
        console.log('\nCleaning up - deleting the uploaded file...');
        await ai.files.delete({ name: uploadedFile.name as string });
        console.log('✓ File deleted successfully!');

        console.log('\n🎉 Sample completed successfully!');
    } catch (error) {
        console.error('\n❌ Error occurred:', error);
        if (error instanceof Error) {
            console.error('Error message:', error.message);
            console.error('Stack trace:', error.stack);
        }
        throw error;
    }
}

async function main() {
    if (GOOGLE_GENAI_USE_VERTEXAI === 'true') {
        console.log('⚠️  Vertex AI is not supported for this sample.');
        console.log(
            'File upload/download APIs are only available on Gemini Developer API.',
        );
        console.log(
            'For Vertex AI, use Google Cloud Storage (GCS) buckets to share files.',
        );
        return;
    }

    if (!GEMINI_API_KEY) {
        console.error('❌ GEMINI_API_KEY environment variable is not set.');
        console.error('Please set it with: export GEMINI_API_KEY=your-api-key');
        return;
    }

    await uploadAndRetrieveFile();
}

main();
