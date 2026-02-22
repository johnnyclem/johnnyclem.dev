export const ELEVENLABS_API_URL = "https://api.elevenlabs.io/v1";

// Voice ID should be set via environment variable
// Default provided for backwards compatibility, but should be overridden
export const ELEVENLABS_VOICE_ID = process.env.ELEVENLABS_VOICE_ID || "pOes13QoIdjnVT9dRau9";

interface ElevenLabsOptions {
  voiceId?: string;
  modelId?: string;
  stability?: number;
  similarityBoost?: number;
  style?: number;
  useSpeakerBoost?: boolean;
}

const defaultOptions: ElevenLabsOptions = {
  voiceId: ELEVENLABS_VOICE_ID,
  modelId: "eleven_turbo_v2_5",
  stability: 0.5,
  similarityBoost: 0.75,
  style: 0,
  useSpeakerBoost: true,
};

export async function textToSpeech(
  text: string,
  options: ElevenLabsOptions = {}
): Promise<Buffer> {
  const apiKey = process.env.ELEVENLABS_API_KEY;

  if (!apiKey) {
    throw new Error("ELEVENLABS_API_KEY environment variable is not set");
  }

  const mergedOptions = { ...defaultOptions, ...options };
  const voiceId = mergedOptions.voiceId!;

  const response = await fetch(
    `${ELEVENLABS_API_URL}/text-to-speech/${voiceId}`,
    {
      method: "POST",
      headers: {
        Accept: "audio/mpeg",
        "Content-Type": "application/json",
        "xi-api-key": apiKey,
      },
      body: JSON.stringify({
        text,
        model_id: mergedOptions.modelId,
        voice_settings: {
          stability: mergedOptions.stability,
          similarity_boost: mergedOptions.similarityBoost,
          style: mergedOptions.style,
          use_speaker_boost: mergedOptions.useSpeakerBoost,
        },
      }),
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `ElevenLabs API error: ${response.status} ${response.statusText} - ${errorText}`
    );
  }

  const arrayBuffer = await response.arrayBuffer();
  return Buffer.from(arrayBuffer);
}

export async function checkApiKeyValidity(): Promise<boolean> {
  const apiKey = process.env.ELEVENLABS_API_KEY;

  if (!apiKey) {
    return false;
  }

  try {
    const response = await fetch(`${ELEVENLABS_API_URL}/user`, {
      headers: {
        "xi-api-key": apiKey,
      },
    });
    return response.ok;
  } catch (error) {
    return false;
  }
}
