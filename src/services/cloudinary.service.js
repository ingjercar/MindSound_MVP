import cloudinary from "../config/cloudinary.js"; // crea archivo config/cloudinary.js si no lo tienes

export const uploadAudioWithTransforms = async (filePath) => {
  // resource_type: 'video' necessary for audio transforms in Cloudinary
  return cloudinary.uploader.upload(filePath, {
    resource_type: "video",
    folder: "mindsound/audio",
    use_filename: true,
    unique_filename: false,
    eager: [
      { format: "mp3", audio_codec: "aac", bitrate: "128k" },
      { format: "ogg", audio_codec: "libvorbis", bitrate: "96k" },
      { format: "mp3", audio_codec: "aac", start_offset: "0", end_offset: "30" } // preview 30s
    ],
    eager_async: true
  });
};

export const generateAudioVariantUrl = (public_id, options = {}) => {
  return cloudinary.url(public_id, { resource_type: "video", ...options });
};
