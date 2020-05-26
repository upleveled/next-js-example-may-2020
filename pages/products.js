import React from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import { getProducts } from '../db.js';

const productList = getProducts();

const Products = () => (
  <div className="container">
    <Head>
      <title>Products</title>
    </Head>

    <Header />

    <main>
      <h1>Products</h1>

      <ul>
        {productList.map((product) => {
          return (
            <li key={product.id}>
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
