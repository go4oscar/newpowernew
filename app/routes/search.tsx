import { json } from '@remix-run/cloudflare';
import type { LoaderFunction } from '@remix-run/cloudflare';
import { useLoaderData } from '@remix-run/react';
import ProductCard from '~/components/ProductCard';

export const loader: LoaderFunction = async () => {
  const SHEET_API =
    'https://script.google.com/macros/s/18p7zsz6q4LcXSHPGvixcUz0TMScGiZBYtGfu_fbSG8u6-oO3K4lAKuLn/exec';
  const res = await fetch(SHEET_API);
  if (!res.ok) {
    throw new Response('Failed to fetch products', { status: 502 });
  }
  const { products } = await res.json();
  return json({ products });
};

export default function Search() {
  const { products } = useLoaderData<{ products: any[] }>();

  return (
    <section className="bg-gray-50">
      <div className="mx-auto max-w-screen-xl px-4 py-8">
        <p className="mb-4 text-lg font-medium">
          Showing {products.length} products
        </p>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <ProductCard
              key={p.SKU || p.id}
              product={{
                id: p.SKU || p.id,
                name: p.Name || p.name,
                price: Number(p.Price || p.price),
                image: p.ImageUrl || p.imageUrl,
                description: p.Description || p.description,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
  );
};

export default Search;
