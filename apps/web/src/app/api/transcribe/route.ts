import { NextRequest, NextResponse } from 'next/server';
import speech from '@google-cloud/speech';

const speechClient = new speech.SpeechClient();

export async function POST(request: NextRequest) {
  try {
    const body = await request.formData();
    const audioFile = body.get('audio') as File | null;

    if (!audioFile) {
      return NextResponse.json({ error: 'No audio file found' }, { status: 400 });
    }

    const audioBytes = await audioFile.arrayBuffer();
    const audio = {
      content: Buffer.from(audioBytes).toString('base64'),
    };

    const config = {
      // Note: The encoding and sampleRateHertz should match the audio format
      // sent from the browser. 'WEBM_OPUS' is a common format for MediaRecorder.
      // You might need to adjust this based on your frontend implementation.
      encoding: 'WEBM_OPUS' as const,
      sampleRateHertz: 48000,
      languageCode: 'en-US',
    };

    const requestPayload = {
      audio: audio,
      config: config,
    };

    const [response] = await speechClient.recognize(requestPayload);
    const transcription = response.results
      ?.map(result => result.alternatives?.[0].transcript)
      .join('\n');

    return NextResponse.json({ transcription });

  } catch (error) {
    console.error('Error transcribing audio:', error);
    return NextResponse.json({ error: 'Failed to transcribe audio' }, { status: 500 });
  }
}