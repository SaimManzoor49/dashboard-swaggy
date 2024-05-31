'use client'
import React from 'react';
import { Form, Input, Button } from 'antd';
import { useMutation } from '@apollo/client';
import { graphql } from '@/gql';


const CATEGORY_MUTATION = graphql(`
mutation AddCategory($name: String!) {
    addCategory(name: $name) {
      id
      name
      slug
    }
  }
  `);

const AddCategory = () => {

    const [addCategory, { data, loading, error }] = useMutation(CATEGORY_MUTATION);

    console.log(data)
    
  const onFinish = (values:any) => {
    console.log('Received values:', values);
    addCategory({ variables: { name: values.name } });
    // You can perform API call or other actions to add the category here
  };

  return (
    <div className="min-h-screen p-6">
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-md">
      <h1 className="text-2xl font-bold mb-6 text-black">Add New Product</h1>
      <Form
        name="add-category-form"
        onFinish={onFinish}
        layout="vertical"
      >
        <Form.Item
          name="name"
          label="Name"
          rules={[
            { required: true, message: 'Please enter the category name' }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Add Category
          </Button>
        </Form.Item>
      </Form>
    </div>
    </div>
  );
};

export default AddCategory;
