'use client'
import api from '@/api/api'
import { useFileUpload } from '@/api/fileUpload'
import FileCard from '@/components/FileCard'
import { InboxOutlined, UploadOutlined } from '@ant-design/icons'
import { Button, Modal, Space, Typography, Upload, UploadProps, message } from 'antd'
import React, { useState } from 'react'

const {Title} = Typography
const {Dragger} = Upload

const FilesPage: React.FC = () => {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [progress, handleFileUpload] = useFileUpload()

  const uploadProps: UploadProps = {
    name: 'file',
    customRequest: handleFileUpload,
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  return <>
    <Space direction='vertical'>
      <Space style={{
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <Title level={2}>My Files</Title>
        <Button onClick={() => setIsUploadModalOpen(true)} icon={<UploadOutlined />}>Click to Upload</Button>
      </Space>
      <Space wrap style={{
        justifyContent: 'center',
        alignItems: 'flex-start'
      }}>
        <FileCard/>
        <FileCard/>
        <FileCard/>
        <FileCard/>
      </Space>
    </Space>
    <Modal title="Upload file" open={isUploadModalOpen} footer={null} onCancel={() => setIsUploadModalOpen(false)}>
      <Dragger {...uploadProps}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">Click or drag file to this area to upload</p>
        <p className="ant-upload-hint">
          Support for a single or bulk upload. Strictly prohibit from uploading company data or other
          band files
        </p>  
    </Dragger>
      </Modal>
  </>
}

export default FilesPage