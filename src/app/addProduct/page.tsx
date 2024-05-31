'use client'
import { useEffect, useState } from 'react';
import { Form, Input, InputNumber, Button, Switch, Upload, message, Select, Radio } from 'antd';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import cloudinary from '@/utils/cloudinary'; // Import the Cloudinary configuration
import { Option } from 'antd/es/mentions';
import { useMutation, useQuery } from '@apollo/client'
import { graphql } from '@/gql';

const AddProduct = () => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<any>([]);
  const [uploading, setUploading] = useState(false);
  const [categories,setCategories] = useState<any>([])

  const CATEGORY_QUERY = graphql(`
    query GetAllCategories {
      getAllCategories {
        id
        name
        slug
      }
    }
  `);

  const ADD_PRODUCT = graphql(`mutation CreateProduct($name: String!, $description: String!, $price: Float!, $quantity: Int!, $shipping: Boolean!, $category: String!, $imageUrls: [String!]!) {
    createProduct(name: $name, description: $description, price: $price, quantity: $quantity, shipping: $shipping, category: $category, imageUrls: $imageUrls) {
      category
      description
      id
      images
      name
      price
      quantity
      shipping
      slug
    }
  }
  `);


  const { data, loading, error } = useQuery(CATEGORY_QUERY);

  const [addProductData ,{ data:productData, loading:productLoading, error:productError }] = useMutation(ADD_PRODUCT);

  useEffect(()=>{
  if(data){
    setCategories(data?.getAllCategories)
  }
  },[data])

  const handleUpload = async () => {
    setUploading(true);
    const uploadedUrls = [];

    for (let file of fileList) {
      const formData = new FormData();
      formData.append('file', file.originFileObj);
      formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!);

      try {
        const response = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, {
          method: 'POST',
          body: formData,
        });

        const data = await response.json();
        if (data.secure_url) {
          uploadedUrls.push(data.secure_url);
        } else {
          throw new Error('Upload failed');
        }
      } catch (error) {
        message.error('Upload failed');
        setUploading(false);
        console.log(error)
        throw error;
      }
    }

    setUploading(false);
    return uploadedUrls;
  };

  const onFinish = async (values:any) => {
    try {
      const imageUrls = await handleUpload();
      const productData = { ...values, imageUrls };
      console.log('Received values:', productData);
      addProductData({variables:productData})
      // You can handle the form submission here, e.g., send the data to your API
    } catch (error) {
      console.error('Failed to upload image:', error);
    }
  };

  const handleChange = ({ fileList: newFileList }:{fileList:any}) => {
    if (newFileList.length <= 6) {
      setFileList(newFileList.filter((file:any) => file.type.startsWith('image/')));
    } else {
      message.warning('You can only upload up to 6 files');
    }
  };

  console.log(productData)

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-md">
        <h1 className="text-2xl font-bold mb-6 text-black">Add New Product</h1>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
        >
          <Form.Item
            name="name"
            label="Product Name"
            rules={[{ required: true, message: 'Please enter the product name' }]}
          >
            <Input placeholder="Enter product name" />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: 'Please enter the product description' }]}
          >
            <Input.TextArea rows={4} placeholder="Enter product description" />
          </Form.Item>
          <Form.Item
            name="price"
            label="Price"
            rules={[{ required: true, message: 'Please enter the product price' }]}
          >
            <InputNumber
              className="w-full"
              placeholder="Enter product price"
              min={0}
              step={0.01}
            />
          </Form.Item>
          <Form.Item
            name="quantity"
            label="Quantity"
            rules={[{ required: true, message: 'Please enter the product quantity' }]}
          >
            <InputNumber
              className="w-full"
              placeholder="Enter product quantity"
              min={0}
            />
          </Form.Item>
          <Form.Item
  name="shipping"
  label="Shipping"
  rules={[{ required: true, message: 'Please specify if shipping is available' }]}
>
  <Radio.Group>
    <Radio value={true}>Yes</Radio>
    <Radio value={false}>No</Radio>
  </Radio.Group>
</Form.Item>
          <Form.Item
  name="category"
  label="Category"
  rules={[{ required: true, message: 'Please select the product category' }]}
>
  <Select
    placeholder="Select product category"
    allowClear
  >
    {categories?.map((c:any,i:any)=>{
        return(
        <Select.Option key={i}  value={c?.id}>{c?.name}</Select.Option>
      )
    })}
    {/* Add more Option elements for additional categories */}
  </Select>
</Form.Item>
          <Form.Item
            name="images"
            label="Images"
            rules={[{ required: true, message: 'Please upload images' }]}
          >
            <Upload
              listType="picture"
              fileList={fileList}
              onChange={handleChange}
              beforeUpload={() => false} // Prevent auto upload
              multiple={true}
              accept="image/*"
            >
              <Button icon={<UploadOutlined />}>Select Files (up to 6)</Button>
            </Upload>
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              icon={<PlusOutlined />}
              loading={uploading}
            >
              Add Product
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default AddProduct;
