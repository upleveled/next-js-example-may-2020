import React from 'react';
import Head from 'next/head';
import Header from '../../../components/Header';

/**
 * @typedef {{
 *   id: string,
 * }} Props
 */

const Products = (/** @type {Props} */ props) => (
  <div className="container">
    <Head>
      <title>Product Deleted</title>
    </Head>

    <Header />

    <main>
      <h1>Product #{props.id} is deleted!</h1>
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
  const id = context.params.id;

  // This following dynamic import is the equivalent
  // to doing the following with static imports
  // import { deleteProductById } from '../../../db.js';
  const { deleteProductById } = await import('../../../db.js');

  await deleteProductById(id);

  return {
    props: {
      // id: id,
      id,
    },
  };
}
