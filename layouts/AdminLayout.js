import Head from "next/head";
import { Navbar } from "../components/admin/Navbar";

export default function AdminLayout({ children }) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>Панель администратора | RoyalFox</title>
      </Head>
      <div className="admin-wrap">
        <Navbar />
        <main className="admi-wrap__main main-admin">
          <h2 className="main-admin__title">Панель администратора</h2>
          {children}
        </main>
      </div>

      <style jsx>{`
        .admin-wrap {
          max-width: 1920px;
          margin: 10px auto;
          padding: 0 10px;
          display: flex;
          flex-wrap: wrap;
          min-height: calc(100vh - 20px);
        }
        .main-admin {
          position: relative;
          flex-basis: calc(75% - 20px);
          margin-left: 20px;
          margin-top: 20px;
        }
        .main-admin__title {
          margin-bottom: 20px;
        }
      `}</style>
    </>
  );
}
