export async function uploadImg(images, path = "/") {
  const formData = new FormData();
  images.forEach((img) => formData.append("image", img));

  const res = await fetch(`/api/upload/?path=${path}`, {
    method: "POST",
    body: formData,
  });

  return await res.json();
}
