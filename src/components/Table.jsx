import React from "react";
import { AiOutlineCheck } from "react-icons/ai";

//function to diplay table UI on PlanPage /SubscriptionPage
export default function Table({ products, selectedPlan }) {
  return (
    <table>
      <tbody className="divide-y divide-[gray]">
        {/* First Row  */}
        <tr className="tableRow">
          <td className="tableDataTitle">Monthly price</td>
          {products.map((product) => (
            <td
              key={product.id}
              className={`tableDataFeature ${
                selectedPlan?.id === product.id
                  ? "text-[#e50914]"
                  : "text-[gray]"
              }`}
            >
              {product.currency}
              {product.price}
            </td>
          ))}
        </tr>

        {/* Second Row */}
        <tr className="tableRow">
          <td className="tableDataTitle">Video quality</td>
          {products.map((product) => (
            <td
              key={product.id}
              className={`tableDataFeature ${
                selectedPlan?.id === product.id
                  ? "text-[#e50914]"
                  : "text-[gray]"
              }`}
            >
              {product.videoQuality}
            </td>
          ))}
        </tr>

        {/* Third Row */}

        <tr className="tableRow">
          <td className="tableDataTitle">Resolution</td>
          {products.map((product) => (
            <td
              key={product.id}
              className={`tableDataFeature ${
                selectedPlan?.id === product.id
                  ? "text-[#e50914]"
                  : "text-[gray]"
              }`}
            >
              {product.resolution}
            </td>
          ))}
        </tr>

        {/* Last Row */}
        <tr className="tableRow">
          <td className="tableDataTitle">
            Watch on your TV, computer, mobile phone and tablet
          </td>
          {products.map((product) => (
            <td
              className={`tableDataFeature ${
                selectedPlan?.id === product.id
                  ? "text-[#E50914]"
                  : "text-[gray]"
              }`}
              key={product.id}
            >
              {product.portability === "true" && (
                <AiOutlineCheck className="inline-block h-8 w-8" />
              )}
            </td>
          ))}
        </tr>
      </tbody>
    </table>
  );
}
