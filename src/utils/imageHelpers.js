export function handleImagePreview(event, currentPreviewUrl, setImagePreviewUrl) {
  const file = event.target.files?.[0];

  if (currentPreviewUrl?.startsWith("blob:")) {
    URL.revokeObjectURL(currentPreviewUrl);
  }

  if (file) {
    const url = URL.createObjectURL(file);
    setImagePreviewUrl(url);
  } else {
    setImagePreviewUrl("");
  }
}