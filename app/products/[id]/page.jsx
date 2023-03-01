import Image from "next/image";

import styles from "./page.module.css";

async function getProducts() {
  const response = await fetch("http://localhost:3000/api/products");
  const data = await response.json();
  return data;
}

async function getCode(id) {
  const response = await fetch(`http://localhost:3000/api/stock-price/${id}`, {
    next: { revalidate: 5 },
  });
  const data = await response.json();
  return data;
}

export default async function Product({ params }) {
  const products = await getProducts();
  //id generated
  const { id } = params;
  const productId = id.match(/\d/g)?.join("");

  const product = products.find(({ id }) => id.toString() === productId);

  const codes = product.skus.map((x) => x.code);

  let prices = [];
  for (let code of codes) {
    try {
      const response = await getCode(code);
      prices.push(response);
    } catch (error) {
      console.log("error" + error);
    }
  }

  const stockUnit = product.skus.map((sku) => ({
    ...sku,
    ...prices.find((price) => price.key === sku.code),
  }));

  return (
    <div key={productId}>
      <div className={styles.image}>
        <Image
          src={product.image}
          alt="beer image"
          sizes="(min-width: 768px) 80px, 60px"
          width={250}
          height={300}
        />
      </div>
      <h2>{product.brand}</h2>
      <p>Style: {product.style}</p>
      <p>Substyle: {product.substyle}</p>
      <p>Abv: {product.abv}</p>
      <p>Origin: {product.origin}</p>
      <p>Description: {product.information}</p>
      {stockUnit.map((sku) => (
        <div key={sku.key} className={styles.sku}>
          <p>{sku.name}</p>
          <p>Stock: {sku.stock}</p>
          <p>
            Price:{" "}
            {(sku.price / 100).toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </p>
        </div>
      ))}
    </div>
  );
}
