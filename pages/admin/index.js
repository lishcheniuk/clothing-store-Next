import { useEffect, useRef } from "react";
import { Chart } from "chart.js";
import randomColor from "randomcolor";
import { useQuery } from "@apollo/client";
import { initializeApollo } from "../../apollo/client";
import AdminLayout from "../../layouts/AdminLayout";
import { ClothingChartQuery } from "../../queries/clothingQueries";

export default function AdminPage() {
  const {
    data: { allClothing },
  } = useQuery(ClothingChartQuery);
  const chartRef = useRef(null);

  useEffect(() => {
    const gainCtx = chartRef.current.getContext("2d");
    gainCtx.height = "300px";
    new Chart(gainCtx, createChartConfig(allClothing));
  }, []);

  function createChartConfig(payload) {
    const clothing = getData(payload);

    const labels = clothing.map((c) => c.name);
    const data = clothing.map((c) => c.count);
    const count = clothing.length;

    return {
      type: "doughnut",
      data: {
        labels,
        datasets: [
          {
            label: "Количество товаров по категориям",
            data,
            backgroundColor: randomColor({
              luminosity: "light",
              format: "rgb",
              count,
              //hue: "blue",
            }),
            // borderColor: randomColor({
            //   luminosity: "dark",
            //   hue: "blue",
            //   count,
            // }),
            borderWidth: 1,
            fill: false,
          },
        ],
        options: {
          responsive: true,
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                },
              },
            ],
          },
        },
      },
    };
  }

  function getData(clothing) {
    return clothing.reduce((acc, c) => {
      const pr = acc.find((item) => item.id === c.categoryId._id);
      pr
        ? (pr.count += 1)
        : acc.push({
            id: c.categoryId._id,
            count: 1,
            name: c.categoryId.name,
          });
      return acc;
    }, []);
  }

  return (
    <AdminLayout>
      <div className="admin-home">
        <div className="admin-home__diagram">
          <canvas ref={chartRef}></canvas>
        </div>
      </div>
      <style jsx>{`
        .admin-home__diagram {
          max-width: 95%;
        }
      `}</style>
    </AdminLayout>
  );
}

export async function getServerSideProps() {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: ClothingChartQuery,
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
  };
}
