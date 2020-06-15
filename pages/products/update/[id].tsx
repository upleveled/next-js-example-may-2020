import React from 'react';
import Head from 'next/head';
import Header from '../../../components/Header';
import { GetServerSidePropsContext } from 'next';

type Props = { id: string; name: string };

const Products = (props: Props) => (
  <div className="container">
    <Head>
      <title>Product Updated</title>
    </Head>

    <Header />

    <main>
      <h1>
        Product #{props.id} is updated with the name "{props.name}"!
      </h1>
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

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const id = context.params?.id;
  const name = context.query.name;

  // This following dynamic import is the equivalent
  // to doing the following with static imports
  // import { updateProductNameById } from '../../../db.js';
  const { updateProductNameById } = await import('../../../db.js');

  await updateProductNameById(id, name);

  return {
    props: {
      // id: id,
      id,
      // name: name,
      name,
    },
  };
}
