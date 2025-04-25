// import React, { useEffect, useState } from 'react';
// import Table from '@/modules/Table';
// import { toast } from 'react-toastify';
// import { getAuthorDashboardStats, getAuthorSalesReport } from '@/services/APIs/dashboard';

// export default function AuthorDashboard({ user }) {
//   const [stats, setStats] = useState({
//     totalBooks: 0,
//     totalSales: 0,
//     totalRoyalty: 0,
//     platformStats: [],
//     recentBooks: []
//   });

//   const [salesReport, setSalesReport] = useState([]);
//   const [selectedBook, setSelectedBook] = useState('all');
//   const [selectedMonth, setSelectedMonth] = useState(() => {
//     const now = new Date();
//     return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
//   });

//   useEffect(() => {
//     fetchAuthorStats();
//   }, []);

//   const fetchAuthorStats = async () => {
//     try {
//       const response = await getAuthorDashboardStats();
//       if (response.status) {
//         setStats(response.data);
//         // Fetch initial sales report
//         fetchSalesReport(selectedBook, selectedMonth);
//       } else {
//         toast.error(response.message);
//       }
//     } catch (error) {
//       toast.error('Failed to fetch dashboard data');
//     }
//   };

//   const fetchSalesReport = async (bookId, month) => {
//     try {
//       const response = await getAuthorSalesReport(bookId, month);
//       if (response.status) {
//         setSalesReport(response.data);
//       } else {
//         toast.error(response.message);
//       }
//     } catch (error) {
//       toast.error('Failed to fetch sales report');
//     }
//   };

//   useEffect(() => {
//     fetchSalesReport(selectedBook, selectedMonth);
//   }, [selectedBook, selectedMonth]);

//   return (
//     <div>
//       {/* Dashboard Cards */}
//       <div className="w-full grid grid-cols-3 gap-4 mb-6">
//         {[
//           { title: "Total Royalty", value: `₹${stats.totalRoyalty || 0}`, icon: "Totalroyalty.png", bgColor: "#FFE9E0" },
//           { title: "Total Books", value: stats.totalBooks || 0, icon: "Totalbooks.png", bgColor: "#FFEAFB" },
//           { title: "Total Sales", value: stats.totalSales || 0, icon: "Totalsale.png", bgColor: "#E6E9FF" }
//         ].map((card, idx) => (
//           <div key={idx} className="p-4 rounded-lg" style={{ backgroundColor: card.bgColor }}>
//             <div className="flex gap-2 items-center">
//               <img src={`/images/${card.icon}`} alt={card.title} className="w-6 h-6" />
//               <span className="font-semibold text-black text-sm">{card.title}</span>
//             </div>
//             <div className="mt-4 text-2xl font-bold">{card.value}</div>
//           </div>
//         ))}
//       </div>

//       {/* Sales Report */}
//       <div className="w-full bg-white rounded-lg p-4 mb-6">
//         <div className="flex justify-between items-center mb-3">
//           <h2 className="text-base font-semibold">Sales Report</h2>
//           <div className="flex gap-4">
//             <select
//               className="border px-2 py-1 text-sm rounded"
//               value={selectedBook}
//               onChange={(e) => setSelectedBook(e.target.value)}
//             >
//               <option value="all">All Books</option>
//               {stats.recentBooks.map((book) => (
//                 <option key={book._id} value={book._id}>
//                   {book.title}
//                 </option>
//               ))}
//             </select>
//             <select
//               className="border px-2 py-1 text-sm rounded"
//               value={selectedMonth}
//               onChange={(e) => setSelectedMonth(e.target.value)}
//             >
//               {Array.from({ length: 12 }, (_, i) => {
//                 const date = new Date();
//                 date.setMonth(date.getMonth() - i);
//                 const year = date.getFullYear();
//                 const month = String(date.getMonth() + 1).padStart(2, "0");
//                 return (
//                   <option key={i} value={`${year}-${month}`}>
//                     {date.toLocaleString("default", { month: "long", year: "numeric" })}
//                   </option>
//                 );
//               })}
//             </select>
//           </div>
//         </div>
//         <div className="mb-2 text-sm text-gray-700 font-medium">
//           Total Sales: <span className="font-bold">₹{stats.totalRoyalty || 0}</span>
//         </div>
//         <Table>
//           <thead>
//             <tr className="border-b">
//               <th className="text-left">Platform</th>
//               <th className="text-center">Orders</th>
//               <th className="text-center">Earnings</th>
//             </tr>
//           </thead>
//           <tbody>
//             {stats.platformStats.map((item, i) => (
//               <tr key={i} className="border-b">
//                 <td className="text-left flex gap-2 items-center">
//                   <img src={`/images/${item.platform.toLowerCase()}.png`} alt={item.platform} className="w-5 h-5" />
//                   {item.platform}
//                 </td>
//                 <td className="text-center">{item.quantity}</td>
//                 <td className="text-center">₹{item.total}</td>
//               </tr>
//             ))}
//           </tbody>
//         </Table>
//       </div>

//       {/* Recent Books */}
//       <div className="w-full bg-white rounded-lg p-4">
//         <h2 className="text-base font-semibold mb-3">Recent Books</h2>
//         <Table>
//           <thead>
//             <tr className="border-b">
//               <th className="text-left">Title</th>
//               <th className="text-center">ISBN</th>
//               <th className="text-center">Price</th>
//               <th className="text-center">Sales</th>
//               <th className="text-center">Royalty</th>
//             </tr>
//           </thead>
//           <tbody>
//             {stats.recentBooks.map((book, i) => (
//               <tr key={i} className="border-b">
//                 <td>{book.title}</td>
//                 <td className="text-center">{book.isbn}</td>
//                 <td className="text-center">₹{book.price}</td>
//                 <td className="text-center">{book.sales || 0}</td>
//                 <td className="text-center">₹{book.royalty || 0}</td>
//               </tr>
//             ))}
//           </tbody>
//         </Table>
//       </div>
//     </div>
//   );
// }

// ✅ NEW CHANGE UPDATE — Fully responsive Author Dashboard

// import React, { useEffect, useState } from 'react';
// import Table from '@/modules/Table';
// import { toast } from 'react-toastify';
// import { getAuthorDashboardStats, getAuthorSalesReport } from '@/services/APIs/dashboard';

// export default function AuthorDashboard({ user }) {
//   const [stats, setStats] = useState({
//     totalBooks: 0,
//     totalSales: 0,
//     totalRoyalty: 0,
//     platformStats: [],
//     recentBooks: []
//   });

//   const [salesReport, setSalesReport] = useState([]);
//   const [selectedBook, setSelectedBook] = useState('all');
//   const [selectedMonth, setSelectedMonth] = useState(() => {
//     const now = new Date();
//     return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
//   });

//   useEffect(() => {
//     fetchAuthorStats();
//   }, []);

//   const fetchAuthorStats = async () => {
//     try {
//       const response = await getAuthorDashboardStats();
//       if (response.status) {
//         setStats(response.data);
//         fetchSalesReport(selectedBook, selectedMonth);
//       } else {
//         toast.error(response.message);
//       }
//     } catch (error) {
//       toast.error('Failed to fetch dashboard data');
//     }
//   };

//   const fetchSalesReport = async (bookId, month) => {
//     try {
//       const response = await getAuthorSalesReport(bookId, month);
//       if (response.status) {
//         setSalesReport(response.data);
//       } else {
//         toast.error(response.message);
//       }
//     } catch (error) {
//       toast.error('Failed to fetch sales report');
//     }
//   };

//   useEffect(() => {
//     fetchSalesReport(selectedBook, selectedMonth);
//   }, [selectedBook, selectedMonth]);

//   return (
//     <div className="p-4 md:px-8">
//       {/* Dashboard Cards */}
//       <div className="w-full grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6"> {/* ✅ NEW CHANGE UPDATE */}
//         {[
//           { title: "Total Royalty", value: `₹${stats.totalRoyalty || 0}`, icon: "Totalroyalty.png", bgColor: "#FFE9E0" },
//           { title: "Total Books", value: stats.totalBooks || 0, icon: "Totalbooks.png", bgColor: "#FFEAFB" },
//           { title: "Total Sales", value: stats.totalSales || 0, icon: "Totalsale.png", bgColor: "#E6E9FF" }
//         ].map((card, idx) => (
//           <div key={idx} className="p-4 rounded-xl" style={{ backgroundColor: card.bgColor }}>
//             <div className="flex gap-2 items-center">
//               <img src={`/images/${card.icon}`} alt={card.title} className="w-6 h-6" />
//               <span className="font-semibold text-black text-sm">{card.title}</span>
//             </div>
//             <div className="mt-4 text-2xl font-bold">{card.value}</div>
//           </div>
//         ))}
//       </div>

//       {/* Sales Report */}
//       <div className="w-full bg-white rounded-xl p-4 mb-6 shadow-sm">
//         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-3"> {/* ✅ NEW CHANGE UPDATE */}
//           <h2 className="text-base font-semibold">Sales Report</h2>
//           <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto"> {/* ✅ NEW CHANGE UPDATE */}
//             <select
//               className="border px-2 py-1 text-sm rounded"
//               value={selectedBook}
//               onChange={(e) => setSelectedBook(e.target.value)}
//             >
//               <option value="all">All Books</option>
//               {stats.recentBooks.map((book) => (
//                 <option key={book._id} value={book._id}>
//                   {book.title}
//                 </option>
//               ))}
//             </select>
//             <select
//               className="border px-2 py-1 text-sm rounded"
//               value={selectedMonth}
//               onChange={(e) => setSelectedMonth(e.target.value)}
//             >
//               {Array.from({ length: 12 }, (_, i) => {
//                 const date = new Date();
//                 date.setMonth(date.getMonth() - i);
//                 const year = date.getFullYear();
//                 const month = String(date.getMonth() + 1).padStart(2, "0");
//                 return (
//                   <option key={i} value={`${year}-${month}`}>
//                     {date.toLocaleString("default", { month: "long", year: "numeric" })}
//                   </option>
//                 );
//               })}
//             </select>
//           </div>
//         </div>
//         <div className="mb-2 text-sm text-gray-700 font-medium">
//           Total Sales: <span className="font-bold">₹{stats.totalRoyalty || 0}</span>
//         </div>
//         <Table>
//           <thead>
//             <tr>
//               <th className="text-left text-xs">Platform</th>
//               <th className="text-center text-xs">Orders</th>
//               <th className="text-center text-xs">Earnings</th>
//             </tr>
//           </thead>
//           <tbody>
//             {stats.platformStats.map((item, i) => (
//               <tr key={i}>
//                 <td className="flex gap-2 items-center text-sm">
//                   <img src={`/images/${item.platform.toLowerCase()}.png`} alt={item.platform} className="w-5 h-5" />
//                   {item.platform}
//                 </td>
//                 <td className="text-center text-sm">{item.quantity}</td>
//                 <td className="text-center text-sm">₹{item.total}</td>
//               </tr>
//             ))}
//           </tbody>
//         </Table>
//       </div>

//       {/* Recent Books */}
//       <div className="w-full bg-white rounded-xl p-4 shadow-sm overflow-x-auto">
//         <h2 className="text-base font-semibold mb-3">Recent Books</h2>
//         <Table>
//           <thead>
//             <tr>
//               <th className="text-left text-xs">Title</th>
//               <th className="text-center text-xs">ISBN</th>
//               <th className="text-center text-xs">Price</th>
//               <th className="text-center text-xs">Sales</th>
//               <th className="text-center text-xs">Royalty</th>
//             </tr>
//           </thead>
//           <tbody>
//             {stats.recentBooks.map((book, i) => (
//               <tr key={i}>
//                 <td className="text-sm">{book.title}</td>
//                 <td className="text-center text-sm">{book.isbn}</td>
//                 <td className="text-center text-sm">₹{book.price}</td>
//                 <td className="text-center text-sm">{book.sales || 0}</td>
//                 <td className="text-center text-sm">₹{book.royalty || 0}</td>
//               </tr>
//             ))}
//           </tbody>
//         </Table>
//       </div>
//     </div>
//   );
// }

// ✅ NEW CHANGE UPDATE — Author Dashboard Scoped View Only

import React, { useEffect, useState } from 'react';
import Table from '@/modules/Table';
import { toast } from 'react-toastify';
import { getAuthorDashboardStats, getAuthorSalesReport } from '@/services/APIs/dashboard';

export default function AuthorDashboard() {
  const [stats, setStats] = useState({
    totalBooks: 0,
    totalSales: 0,
    totalRoyalty: 0,
    platformStats: [],
    recentBooks: [],
    transactionHistory: [],
  });

  const [salesReport, setSalesReport] = useState([]);
  const [selectedBook, setSelectedBook] = useState('all');
  const [selectedMonth, setSelectedMonth] = useState(() => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  });

  useEffect(() => {
    fetchAuthorStats();
  }, []);

  const fetchAuthorStats = async () => {
    try {
      const response = await getAuthorDashboardStats();
      if (response.status) {
        setStats(response.data);
        fetchSalesReport(selectedBook, selectedMonth);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error('Failed to fetch dashboard data');
    }
  };

  const fetchSalesReport = async (bookId, month) => {
    try {
      const response = await getAuthorSalesReport(bookId, month);
      if (response.status) {
        setSalesReport(response.data);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error('Failed to fetch sales report');
    }
  };

  useEffect(() => {
    fetchSalesReport(selectedBook, selectedMonth);
  }, [selectedBook, selectedMonth]);

  return (
    <div className="p-4 md:px-8">
      {/* Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
        {[
          { title: "Total Royalty", value: `₹${stats.totalRoyalty}`, icon: "Totalroyalty.png", bgColor: "#FFE9E0" },
          { title: "Total Books", value: stats.totalBooks, icon: "Totalbooks.png", bgColor: "#FFEAFB" },
          { title: "Total Sale", value: stats.totalSales, icon: "Totalsale.png", bgColor: "#E6E9FF" }
        ].map((card, i) => (
          <div key={i} className="p-4 rounded-xl" style={{ backgroundColor: card.bgColor }}>
            <div className="flex gap-2 items-center">
              <img src={`/images/${card.icon}`} alt={card.title} className="w-6 h-6" />
              <span className="font-semibold text-black text-sm">{card.title}</span>
            </div>
            <div className="mt-4 text-2xl font-bold">{card.value}</div>
          </div>
        ))}
      </div>

      {/* Sales Report */}
      <div className="bg-white rounded-xl p-4 mb-6 shadow-sm">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3 gap-3">
          <h2 className="text-base font-semibold">Sales Report</h2>
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <select
              className="border px-2 py-1 text-sm rounded"
              value={selectedBook}
              onChange={(e) => setSelectedBook(e.target.value)}
            >
              <option value="all">All Books</option>
              {stats.recentBooks.map(book => (
                <option key={book._id} value={book._id}>{book.title}</option>
              ))}
            </select>
            <select
              className="border px-2 py-1 text-sm rounded"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
            >
              {Array.from({ length: 12 }, (_, i) => {
                const date = new Date();
                date.setMonth(date.getMonth() - i);
                const year = date.getFullYear();
                const month = String(date.getMonth() + 1).padStart(2, "0");
                return (
                  <option key={i} value={`${year}-${month}`}>
                    {date.toLocaleString("default", { month: "long", year: "numeric" })}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <Table>
          <thead>
            <tr>
              <th className="text-left text-xs">Platform name</th>
              <th className="text-center text-xs">Quantity</th>
              <th className="text-center text-xs">Profits Earned</th>
              <th className="text-center text-xs">Date</th>
            </tr>
          </thead>
          <tbody>
            {salesReport.map((item, i) => (
              <tr key={i}>
                <td className="text-sm flex items-center gap-2">
                  <img src={`/images/${item.platform.toLowerCase()}.png`} className="w-5 h-5" />
                  {item.platform}
                </td>
                <td className="text-center text-sm">{item.quantity}</td>
                <td className="text-center text-sm">₹{item.total}</td>
                <td className="text-center text-sm">{item.date}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <div className="w-full text-center mt-4">
          <button className="px-4 py-2 text-sm border rounded">Load more</button>
        </div>
      </div>

      {/* Transaction History */}
      <div className="bg-white rounded-xl p-4 mb-6 shadow-sm">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-base font-semibold">Transaction History</h2>
          <select
            className="border px-2 py-1 text-sm rounded"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
          >
            {Array.from({ length: 12 }, (_, i) => {
              const date = new Date();
              date.setMonth(date.getMonth() - i);
              const year = date.getFullYear();
              const month = String(date.getMonth() + 1).padStart(2, "0");
              return (
                <option key={i} value={`${year}-${month}`}>
                  {date.toLocaleString("default", { month: "long", year: "numeric" })}
                </option>
              );
            })}
          </select>
        </div>
        <Table>
          <thead>
            <tr>
              <th className="text-left text-xs">Payment Date</th>
              <th className="text-center text-xs">Total Sales</th>
              <th className="text-center text-xs">Total Returned</th>
              <th className="text-center text-xs">Return Royalty</th>
              <th className="text-center text-xs">Total to be paid</th>
            </tr>
          </thead>
          <tbody>
            {(stats.transactionHistory || []).map((tx, i) => (
              <tr key={i}>
                <td className="text-sm">{tx.date}</td>
                <td className="text-center text-sm">{tx.totalSales}</td>
                <td className="text-center text-sm">{tx.totalReturned}</td>
                <td className="text-center text-sm text-red-500">-₹{tx.returnRoyalty}</td>
                <td className="text-center text-sm">₹{tx.toPay}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <div className="w-full text-center mt-4">
          <button className="px-4 py-2 text-sm border rounded">Load more</button>
        </div>
      </div>
    </div>
  );
}
