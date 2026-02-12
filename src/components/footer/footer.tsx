import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t bg-white mt-25">
      <div className="container mx-auto">
        <div className="max-w-full   px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <Link href={"/"}>
              {" "}
              <div className="flex items-center gap-2 mb-4">
                {" "}
                <div className="w-8 h-8 bg-black text-white flex items-center justify-center rounded font-semibold">
                  S
                </div>
                <h2 className="text-lg font-semibold">ShopMart</h2>
              </div>
            </Link>

            <p className="text-sm text-gray-500 leading-relaxed">
              Your one-stop destination for the latest technology, fashion, and
              lifestyle products. Quality guaranteed with fast shipping and
              excellent customer service.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h3 className="font-semibold mb-4 uppercase text-sm">Shop</h3>
            <ul className="space-y-3 text-sm text-gray-500">
              <li className="hover:text-black cursor-pointer">Electronics</li>
              <li className="hover:text-black cursor-pointer">Fashion</li>
              <li className="hover:text-black cursor-pointer">Home & Garden</li>
              <li className="hover:text-black cursor-pointer">Sports</li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="font-semibold mb-4 uppercase text-sm">
              Customer Service
            </h3>
            <ul className="space-y-3 text-sm text-gray-500">
              <li className="hover:text-black cursor-pointer">Contact Us</li>
              <li className="hover:text-black cursor-pointer">Help Center</li>
              <li className="hover:text-black cursor-pointer">
                Track Your Order
              </li>
              <li className="hover:text-black cursor-pointer">
                Returns & Exchanges
              </li>
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h3 className="font-semibold mb-4 uppercase text-sm">Policies</h3>
            <ul className="space-y-3 text-sm text-gray-500">
              <li className="hover:text-black cursor-pointer">
                Privacy Policy
              </li>
              <li className="hover:text-black cursor-pointer">
                Terms of Service
              </li>
              <li className="hover:text-black cursor-pointer">Cookie Policy</li>
              <li className="hover:text-black cursor-pointer">
                Shipping Policy
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
