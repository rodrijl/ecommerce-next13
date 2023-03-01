import Link from "next/link";
import Image from "next/image";

import styles from "./ListOfProducts.module.css";

async function getProducts() {
  const response = await fetch("http://localhost:3000/api/products");
  const data = await response.json();
  return data;
}

export default async function ListOfProducts() {
  const products = await getProducts();
  return (
    <div className={styles.container}>
      {products.map((product) => (
        <div key={product.id} className={styles.card}>
          <Link
            href="/products/[id]"
            as={`/products/${product.id}-${product.brand
              .toLocaleLowerCase()
              .replace(/ /g, "-")}`}
          >
            <Image
              src={product.image}
              alt="beer image"
              width={200}
              height={300}
              layout="fixed"
              objectFit="contain"
            />
            <h2>{product.brand}</h2>
          </Link>
        </div>
      ))}
    </div>
  );
}
