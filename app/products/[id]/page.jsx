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
    cache: "no-store",
  });
  const data = await response.json();
  return data;
}

export default async function Product({ params }) {
  const products = await getProducts();
  const { id } = params;

  let numb = id.match(/\d/g);
  numb = numb?.join("");

  const result = products.find(({ id }) => id.toString() === numb);

  const codes = result.skus.map((x) => x.code);

  let prices = [];
  for (let elem of codes) {
    try {
      let insertResponse = await getCode(elem);
      prices.push(insertResponse);
    } catch (error) {
      console.log("error" + error);
    }
  }

  const j = result.skus.map((v) => ({
    ...v,
    ...prices.find((sp) => sp.key === v.code),
  }));

  return (
    <div key={numb}>
      <div className={styles.image}>
        <Image
          src={result.image}
          alt="beer image"
          sizes="(min-width: 768px) 80px, 60px"
          width={250}
          height={300}
        />
      </div>
      <h2>{result.brand}</h2>
      <p>Style: {result.style}</p>
      <p>Substyle: {result.substyle}</p>
      <p>Abv: {result.abv}</p>
      <p>Origin: {result.origin}</p>
      <p>Description: {result.information}</p>
      {j.map((sku) => (
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
