import React from 'react';
import { useDisclosure } from '@mantine/hooks';
import { Button, Checkbox, TextInput, Container, Stack, Table, Modal, NumberInput } from '@mantine/core'
import '@mantine/core/styles.css'
import '@mantine/notifications/styles.css'

interface Product {
  price: number;
  name: string;
  count: number;
}

interface Products {
  category: string;
  categoryList: Product[];
}

function FilterableProductTable({ products } : { products: Products[] }) {

  return (
    <Stack gap="md">
      <SearchBar />
      <ProductTable 
        products={products} />
    </Stack>
  );
}

function ProductCategoryRow({ category }: { category: string }) {
  return (
    <Table.Tr>
      <Table.Th>{category}</Table.Th>
    </Table.Tr>
  );
}

function ProductRow({ product }: { product: Product }) {
  const name = (product.count > 0) ? product.name :
    <span style={{ color: 'red' }}>
      {product.name}
    </span>;

  return (
    <Table.Tr>
      <Table.Td>{name}</Table.Td>
      <Table.Td>{`$${product.price}`}</Table.Td>
      <Table.Td>{`${product.count}`}</Table.Td>
    </Table.Tr>
  );
}

function ProductTable({ products }: { products: Products[] }) {
  const rows: any = [];

  products.forEach((category) => {
    rows.push(
      <ProductCategoryRow 
        category={category["category"]}
        key={category["category"]}/>
    )
    category["categoryList"].forEach((product) => {
      rows.push(
        <ProductRow
          product={product}
          key={product.name} />
      );
    })
  });

  return (
    <Table>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Name</Table.Th>
          <Table.Th>Price</Table.Th>
          <Table.Th>Count</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
}

function SearchBar({}: {}) {
  return (
    <Stack gap="sm">
      <TextInput placeholder="Search..." />
      <Checkbox label="Only show products in stock" />
    </Stack>
  );
}

function handleProductAddButtonClick({
  close,
}: {
  close: () => void;
}) {
  if (false) {
  } else {
    close();
  }
}

function ProductAddButton({
  productList,
}: {
  productList: Array<Products>;
}) {
  const [opened, {open, close}] = useDisclosure(false);

  return (
    <>
      <Modal opened={opened} onClose={close} title="Add Product" centered>
        <Stack gap="md">
          <TextInput label="Product Category" />

          <TextInput label="New Product Name" />

          <NumberInput label="Amount" />

          <NumberInput label="Price" />
          
          <Button size="xs" onClick={() => {
            handleProductAddButtonClick({
              close: close, 
            });
          }}>Done</Button>

        </Stack>
      </Modal>

      <Button size="xs" onClick={open}>
        Add Product
      </Button>
    </>
  )
}

const PRODUCTS: Products[] = 
  [{category: "Fruits", categoryList: [{price: 1, name: "Apple", count: 1},
  {price: 1, name: "Dragonfruit", count: 1},
  {price: 2, name: "Passionfruit", count: 0}]},

  {category: "Vegetables", categoryList: [{price: 2, name: "Spinach", count: 1},
  {price: 4, name: "Pumpkin", count: 0},
  {price: 1, name: "Peas", count: 1}]}
  ];

function App() {
  const productList = PRODUCTS;

  return (
    <Container size="xs" px="md" mt={40}>
      <Stack gap="md">
        <FilterableProductTable products={productList} />
        <ProductAddButton productList={productList} />
      </Stack>
    </Container>
  );
}

export default App;