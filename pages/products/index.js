import React from 'react';
import Head from 'next/head';
import Header from '../../components/Header';

const Products = (props) => (
  <div className="container">
    <Head>
      <title>Products</title>
    </Head>

    <Header />

    <main>
      <h1>Products</h1>

      <ul>
        {props.products.map((product) => {
          return (
            <li key={product.id}>
              <a href={`/products/delete/${product.id}`}>&times;</a>{' '}
              {product.id} {product.name}
            </li>
          );
        })}
      </ul>
    </main>

    <style jsx>{`
      .container {
        min-height: 100vh;
        padding: 0 0.5rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }

      main {
        padding: 5rem 0;
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
    `}</style>

    <style jsx global>{`
      html,
      body {
        padding: 0;
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
          Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
      }

      * {
        box-sizing: border-box;
      }
    `}</style>
  </div>
);

export default Products;

export async function getServerSideProps(context) {
  // This following dynamic import is the equivalent
  // to doing the following with static imports
  // import { getProducts } from '../../db.js';
  const { getProducts } = await import('../../db.js');

  const products = await getProducts();

  return {
    props: {
      // products: products,
      products,
    },
  };
}
