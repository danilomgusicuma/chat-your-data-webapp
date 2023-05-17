import { useState } from "react";
import api from "./api"
import {UploadRequestOption} from 'rc-upload/lib/interface'
import { AxiosProgressEvent } from "axios";

export const useFileUpload = (): [number | null, (e:UploadRequestOption) => Promise<any>] => {
  const [progress, setProgress] = useState<number | null>(0);
  const handleFileUpload = async ({file, onSuccess, onError, onProgress}: UploadRequestOption) => {
    const formData = new FormData()
    formData.append('file', file)
    const config = {
      headers: { "content-type": "multipart/form-data" },
      onUploadProgress: (event: AxiosProgressEvent) => {
        const percent = event.total ? Math.floor((event.loaded / event.total) * 100) : null;
        setProgress(percent);
        if (percent === 100) {
          setTimeout(() => setProgress(0), 1000);
        }
        if(onProgress!=null && event.total!=null) onProgress({ percent: (event.loaded / event.total) * 100 });
      }
    };
    try {
      const {data} = await api.post('/upload', formData, config)
      if(onSuccess!=null) onSuccess('Ok')
      return data
    } catch (err) {
      const error = new Error("Failed to upload file");
      if(onError!=null) onError(error);
    }
  }
  return [progress, handleFileUpload]
}
