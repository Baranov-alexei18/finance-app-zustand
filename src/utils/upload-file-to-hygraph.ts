const apiKey = import.meta.env.VITE_HYGRAPH_AUTH_TOKEN;

export const uploadFileToHygraph = async (file: File) => {
  const formData = new FormData();
  formData.append('fileUpload', file);

  const response = await fetch(
    'https://api.hygraph.com/content/v2/321c911ccacb425cabed00a0a9d74640/upload',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
      mode: 'no-cors',
      body: formData,
    }
  );

  if (!response.ok) {
    throw new Error('Ошибка загрузки файла');
  }

  const data = await response.json();
  return data;
};
