// import Button from "@/components/Button";
// import Layout from "@/layout/Layout";
// import Card from "@/modules/books/Card";
// import FilterBar from "@/modules/FilterBar";
// import Loader from "@/modules/Loader";
// import Pagination from "@/modules/Pagination";
// import { getAllBooks } from "@/services/APIs/books";
// import { debounce } from "@/Utilities/helpers";
// import { useRouter } from "next/router";
// import { useCallback, useEffect, useState } from "react";

// export default function Index({ role }) {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [paginationData, setPaginationData] = useState(null);
//   const router = useRouter();

//   const [filters, setFilters] = useState({
//     keyword: "",
//     status: "",
//     sort: "",
//     page: 1,
//     limit: 10,
//   });

//   const filterHandler = useCallback((keyword, status, page, limit, sort) => {
//     const newFilters = {
//       keyword: keyword ?? "",
//       status: status ?? "",
//       sort: sort ?? "",
//       page: page ?? 1,
//       limit: limit ?? 10,
//     };
//     setFilters(newFilters);
//     fetchData(newFilters);
//   }, []);

//   const debouncedFilterHandler = useCallback(
//     debounce((keyword, status, page, limit, sort) => {
//       filterHandler(keyword, status, page, limit, sort);
//     }, 400),
//     [filterHandler]
//   );

//   const fetchData = async (queryFilters = filters) => {
//     setLoading(true);

//     const response = await getAllBooks();
//     if (response?.status) {
//       let books = response.data;


//       // ✅ Normalize undefined status to "pending"
//       books = books.map((book) => ({
//         ...book,
//         status: book.status || "pending",
//       }));

//       // ✅ Filter by keyword
//       if (queryFilters.keyword) {
//         const keyword = queryFilters.keyword.toLowerCase();
//         books = books.filter(
//           (book) =>
//             book.title?.toLowerCase().includes(keyword) ||
//             book.author?.name?.toLowerCase().includes(keyword)
//         );
//       }

//       // ✅ Filter by status
//       if (queryFilters.status) {
//         books = books.filter((book) => book.status === queryFilters.status);
//       }

//       // ✅ Sort
//       if (queryFilters.sort === "1") {
//         books = books.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
//       } else if (queryFilters.sort === "2") {
//         books = books.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
//       }

//       // ✅ Pagination
//       const start = (queryFilters.page - 1) * queryFilters.limit;
//       const paginated = books.slice(start, start + queryFilters.limit);

//       setData(paginated);
//       setPaginationData({
//         page: queryFilters.page,
//         limit: queryFilters.limit,
//         totalPages: Math.ceil(books.length / queryFilters.limit),
//         totalResults: books.length,
//       });
//     } else {
//       setData([]);
//       setPaginationData({
//         page: 1,
//         limit: filters.limit,
//         totalPages: 0,
//         totalResults: 0,
//       });
//     }

//     setLoading(false);
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   return (
//     <Layout role={role}>
//       <div className="w-full flex justify-between items-center flex-wrap md:flex-nowrap">
//         <h1 className="text-2xl font-bold mb-2 md:mb-0">Books</h1>
//         <Button
//           variant="primary"
//           className="md:w-auto w-full"
//           onClick={() => router.push("/books/create")}
//         >
//           + Create Book
//         </Button>
//       </div>

//       <div className="w-full mt-5 bg-white rounded-md p-4">
//       <FilterBar
//   data={data}
//   sort={true}
//   handler={filterHandler}
//   debouncedHandler={debouncedFilterHandler}
//   currentFilters={filters}
//   placeholder="Search by book name, author"
// />


//         {loading ? (
//           <Loader />
//         ) : data.length > 0 ? (
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 py-4">
//             {data.map((book, index) => (
//               <Card
//                 key={book._id || book.id || index}
//                 data={book}
//                 variant={book.status}
//               />
//             ))}
//           </div>
//         ) : (
//           <div className="text-center py-10">
//             <img
//               src="/images/no-data.png"
//               alt="No books found"
//               className="mx-auto mb-3 w-32 h-32 object-contain"
//             />
//             <h3 className="text-gray-600 text-lg">No books found.</h3>
//           </div>
//         )}

//         {!loading && paginationData && (
//           <Pagination
//             filters={filters}
//             data={paginationData}
//             handler={filterHandler}
//           />
//         )}
//       </div>
//     </Layout>
//   );
// }

// export async function getServerSideProps({ req }) {
//   const role = req.cookies._r || null;
//   return {
//     props: { role },
//   };
// }

// import Button from "@/components/Button";
// import Layout from "@/layout/Layout";
// import Card from "@/modules/books/Card";
// import FilterBar from "@/modules/FilterBar";
// import Loader from "@/modules/Loader";
// import Pagination from "@/modules/Pagination";
// import { getAllBooks } from "@/services/APIs/books";
// import { debounce } from "@/Utilities/helpers";
// import { useRouter } from "next/router";
// import { useCallback, useEffect, useState } from "react";

// export default function Index({ role, userId }) {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [paginationData, setPaginationData] = useState(null);
//   const router = useRouter();

//   const [filters, setFilters] = useState({
//     keyword: "",
//     status: "",
//     sort: "",
//     page: 1,
//     limit: 10,
//   });

//   const filterHandler = useCallback((keyword, status, page, limit, sort) => {
//     const newFilters = {
//       keyword: keyword ?? "",
//       status: status ?? "",
//       sort: sort ?? "",
//       page: page ?? 1,
//       limit: limit ?? 10,
//     };
//     setFilters(newFilters);
//     fetchData(newFilters);
//   }, []);

//   const debouncedFilterHandler = useCallback(
//     debounce((keyword, status, page, limit, sort) => {
//       filterHandler(keyword, status, page, limit, sort);
//     }, 400),
//     [filterHandler]
//   );

//   const fetchData = async (queryFilters = filters) => {
//     setLoading(true);
//     const response = await getAllBooks();

//     if (response?.status) {
//       let books = response.data;
//       console.log(books);

//       // ✅ SHOW ONLY BOOKS BY LOGGED-IN AUTHOR
//       if (role === "author") {
//         books = books.filter(
//           (book) =>
//             book.author === userId || // case when author is a string
//             book.author?._id === userId // case when author is an object
//         );
//       }

//       // Normalize status
//       books = books.map((book) => ({
//         ...book,
//         status: book.status || "pending",
//       }));

//       // Keyword filter
//       if (queryFilters.keyword) {
//         const keyword = queryFilters.keyword.toLowerCase();
//         books = books.filter(
//           (book) =>
//             book.title?.toLowerCase().includes(keyword) ||
//             book.author?.name?.toLowerCase().includes(keyword)
//         );
//       }

//       // Status filter
//       if (queryFilters.status) {
//         books = books.filter((book) => book.status === queryFilters.status);
//       }

//       // Sort
//       if (queryFilters.sort === "1") {
//         books = books.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
//       } else if (queryFilters.sort === "2") {
//         books = books.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
//       }

//       // Pagination
//       const start = (queryFilters.page - 1) * queryFilters.limit;
//       const paginated = books.slice(start, start + queryFilters.limit);

//       setData(paginated);
//       setPaginationData({
//         page: queryFilters.page,
//         limit: queryFilters.limit,
//         totalPages: Math.ceil(books.length / queryFilters.limit),
//         totalResults: books.length,
//       });
//     } else {
//       setData([]);
//       setPaginationData({
//         page: 1,
//         limit: filters.limit,
//         totalPages: 0,
//         totalResults: 0,
//       });
//     }

//     setLoading(false);
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   return (
//     <Layout role={role}>
//       <div className="w-full flex justify-between items-center flex-wrap md:flex-nowrap">
//         <h1 className="text-2xl font-bold mb-2 md:mb-0">Books</h1>
//         <Button
//           variant="primary"
//           className="md:w-auto w-full"
//           onClick={() => router.push("/books/create")}
//         >
//           + Create Book
//         </Button>
//       </div>

//       <div className="w-full mt-5 bg-white rounded-md p-4">
//         <FilterBar
//           data={data}
//           sort={true}
//           handler={filterHandler}
//           debouncedHandler={debouncedFilterHandler}
//           currentFilters={filters}
//           placeholder="Search by book name, author"
//         />

//         {loading ? (
//           <Loader />
//         ) : data.length > 0 ? (
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 py-4">
//             {data.map((book, index) => (
//               <Card
//                 key={book._id || book.id || index}
//                 data={book}
//                 variant={book.status}
//               />
//             ))}
//           </div>
//         ) : (
//           <div className="text-center py-10">
//             <img
//               src="/images/no-data.png"
//               alt="No books found"
//               className="mx-auto mb-3 w-32 h-32 object-contain"
//             />
//             <h3 className="text-gray-600 text-lg">No books found.</h3>
//           </div>
//         )}

//         {!loading && paginationData && (
//           <Pagination
//             filters={filters}
//             data={paginationData}
//             handler={filterHandler}
//           />
//         )}
//       </div>
//     </Layout>
//   );
// }

// // ✅ Get both role and user ID from cookies
// export async function getServerSideProps({ req }) {
//   const role = req.cookies._r || null;
//   const userCookie = req.cookies._u;

//   let userId = null;
//   try {
//     userId = userCookie ? JSON.parse(decodeURIComponent(userCookie))._id : null;
//   } catch (err) {
//     userId = null;
//   }

//   return {
//     props: {
//       role,
//       userId,
//     },
//   };
// }

// ✅ NEW CHANGE UPDATE — Author-based filtering fixed

// import Button from "@/components/Button";
// import Layout from "@/layout/Layout";
// import Card from "@/modules/books/Card";
// import FilterBar from "@/modules/FilterBar";
// import Loader from "@/modules/Loader";
// import Pagination from "@/modules/Pagination";
// import { getAllBooks } from "@/services/APIs/books";
// import { debounce } from "@/Utilities/helpers";
// import { useRouter } from "next/router";
// import { useCallback, useEffect, useState } from "react";

// export default function Index({ role, userId }) {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [paginationData, setPaginationData] = useState(null);
//   const router = useRouter();

//   const [filters, setFilters] = useState({
//     keyword: "",
//     status: "",
//     sort: "",
//     page: 1,
//     limit: 10,
//   });

//   const filterHandler = useCallback((keyword, status, page, limit, sort) => {
//     const newFilters = {
//       keyword: keyword ?? "",
//       status: status ?? "",
//       sort: sort ?? "",
//       page: page ?? 1,
//       limit: limit ?? 10,
//     };
//     setFilters(newFilters);
//     fetchData(newFilters);
//   }, []);

//   const debouncedFilterHandler = useCallback(
//     debounce((keyword, status, page, limit, sort) => {
//       filterHandler(keyword, status, page, limit, sort);
//     }, 400),
//     [filterHandler]
//   );

//   const fetchData = async (queryFilters = filters) => {
//     setLoading(true);
//     const response = await getAllBooks();

//     if (response?.status) {
//       let books = response.data;
//       console.log("Raw Books:", books);

//       // ✅ Filter by logged-in author
//       if (role === "author") {
//         books = books.filter((book) => {
//           if (!book.author) return false;
//           if (typeof book.author === "string") return book.author === userId;
//           if (typeof book.author === "object") return book.author._id === userId;
//           return false;
//         });
//       }

//       // Normalize status
//       books = books.map((book) => ({
//         ...book,
//         status: book.status || "pending",
//       }));

//       // Keyword filter
//       if (queryFilters.keyword) {
//         const keyword = queryFilters.keyword.toLowerCase();
//         books = books.filter(
//           (book) =>
//             book.title?.toLowerCase().includes(keyword) ||
//             book.author?.name?.toLowerCase().includes(keyword)
//         );
//       }

//       // Status filter
//       if (queryFilters.status) {
//         books = books.filter((book) => book.status === queryFilters.status);
//       }

//       // Sort
//       if (queryFilters.sort === "1") {
//         books = books.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
//       } else if (queryFilters.sort === "2") {
//         books = books.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
//       }

//       // Pagination
//       const start = (queryFilters.page - 1) * queryFilters.limit;
//       const paginated = books.slice(start, start + queryFilters.limit);

//       setData(paginated);
//       setPaginationData({
//         page: queryFilters.page,
//         limit: queryFilters.limit,
//         totalPages: Math.ceil(books.length / queryFilters.limit),
//         totalResults: books.length,
//       });
//     } else {
//       setData([]);
//       setPaginationData({
//         page: 1,
//         limit: filters.limit,
//         totalPages: 0,
//         totalResults: 0,
//       });
//     }

//     setLoading(false);
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   return (
//     <Layout role={role}>
//       <div className="w-full flex justify-between items-center flex-wrap md:flex-nowrap">
//         <h1 className="text-2xl font-bold mb-2 md:mb-0">Books</h1>
//         <Button
//           variant="primary"
//           className="md:w-auto w-full"
//           onClick={() => router.push("/books/create")}
//         >
//           + Create Book
//         </Button>
//       </div>

//       <div className="w-full mt-5 bg-white rounded-md p-4">
//         <FilterBar
//           data={data}
//           sort={true}
//           handler={filterHandler}
//           debouncedHandler={debouncedFilterHandler}
//           currentFilters={filters}
//           placeholder="Search by book name, author"
//         />

//         {loading ? (
//           <Loader />
//         ) : data.length > 0 ? (
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 py-4">
//             {data.map((book, index) => (
//               <Card
//                 key={book._id || book.id || index}
//                 data={book}
//                 variant={book.status}
//               />
//             ))}
//           </div>
//         ) : (
//           <div className="text-center py-10">
//             <img
//               src="/images/no-data.png"
//               alt="No books found"
//               className="mx-auto mb-3 w-32 h-32 object-contain"
//             />
//             <h3 className="text-gray-600 text-lg">No books found.</h3>
//           </div>
//         )}

//         {!loading && paginationData && (
//           <Pagination
//             filters={filters}
//             data={paginationData}
//             handler={filterHandler}
//           />
//         )}
//       </div>
//     </Layout>
//   );
// }

// // ✅ SERVER-SIDE COOKIE PARSING
// export async function getServerSideProps({ req }) {
//   const role = req.cookies._r || null;
//   const userCookie = req.cookies._u;

//   let userId = null;
//   try {
//     userId = userCookie ? JSON.parse(decodeURIComponent(userCookie))._id : null;
//   } catch (err) {
//     userId = null;
//   }

//   return {
//     props: {
//       role,
//       userId,
//     },
//   };
// }

// ✅ NEW CHANGE UPDATE — Author book filtering fixed with string comparison

// ✅ NEW CHANGE UPDATE — Filter books by author name

// import Button from "@/components/Button";
// import Layout from "@/layout/Layout";
// import Card from "@/modules/books/Card";
// import FilterBar from "@/modules/FilterBar";
// import Loader from "@/modules/Loader";
// import Pagination from "@/modules/Pagination";
// import { getAllBooks } from "@/services/APIs/books";
// import { debounce } from "@/Utilities/helpers";
// import { useRouter } from "next/router";
// import { useCallback, useEffect, useState } from "react";

// export default function Index({ role, userName }) {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [paginationData, setPaginationData] = useState(null);
//   const router = useRouter();

//   const [filters, setFilters] = useState({
//     keyword: "",
//     status: "",
//     sort: "",
//     page: 1,
//     limit: 10,
//   });

//   const filterHandler = useCallback((keyword, status, page, limit, sort) => {
//     const newFilters = {
//       keyword: keyword ?? "",
//       status: status ?? "",
//       sort: sort ?? "",
//       page: page ?? 1,
//       limit: limit ?? 10,
//     };
//     setFilters(newFilters);
//     fetchData(newFilters);
//   }, []);

//   const debouncedFilterHandler = useCallback(
//     debounce((keyword, status, page, limit, sort) => {
//       filterHandler(keyword, status, page, limit, sort);
//     }, 400),
//     [filterHandler]
//   );

//   const fetchData = async (queryFilters = filters) => {
//     setLoading(true);
//     const response = await getAllBooks();

//     if (response?.status) {
//       let books = response.data;

//       // ✅ Filter books for authors by matching author name
//       if (role === "author") {
//         books = books.filter((book) => 
//           {
//           return (
//             book.author &&
//             book.author.name &&

//             String(book.author.name).toLowerCase() === String(userName).toLowerCase()
//           );
//         });
//       }

//       // Normalize missing status
//       books = books.map((book) => ({
//         ...book,
//         status: book.status || "pending",
//       }));

//       // Keyword filter
//       if (queryFilters.keyword) {
//         const keyword = queryFilters.keyword.toLowerCase();
//         books = books.filter(
//           (book) =>
//             book.title?.toLowerCase().includes(keyword) ||
//             book.author?.name?.toLowerCase().includes(keyword)
//         );
//       }

//       // Status filter
//       if (queryFilters.status) {
//         books = books.filter((book) => book.status === queryFilters.status);
//       }

//       // Sort
//       if (queryFilters.sort === "1") {
//         books = books.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
//       } else if (queryFilters.sort === "2") {
//         books = books.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
//       }

//       // Pagination
//       const start = (queryFilters.page - 1) * queryFilters.limit;
//       const paginated = books.slice(start, start + queryFilters.limit);

//       setData(paginated);
//       setPaginationData({
//         page: queryFilters.page,
//         limit: queryFilters.limit,
//         totalPages: Math.ceil(books.length / queryFilters.limit),
//         totalResults: books.length,
//       });
//     } else {
//       setData([]);
//       setPaginationData({
//         page: 1,
//         limit: filters.limit,
//         totalPages: 0,
//         totalResults: 0,
//       });
//     }

//     setLoading(false);
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   return (
//     <Layout role={role}>
//       <div className="w-full flex justify-between items-center flex-wrap md:flex-nowrap">
//         <h1 className="text-2xl font-bold mb-2 md:mb-0">Books</h1>
//         <Button
//           variant="primary"
//           className="md:w-auto w-full"
//           onClick={() => router.push("/books/create")}
//         >
//           + Create Book
//         </Button>
//       </div>

//       <div className="w-full mt-5 bg-white rounded-md p-4">
//         <FilterBar
//           data={data}
//           sort={true}
//           handler={filterHandler}
//           debouncedHandler={debouncedFilterHandler}
//           currentFilters={filters}
//           placeholder="Search by book name, author"
//         />

//         {loading ? (
//           <Loader />
//         ) : data.length > 0 ? (
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 py-4">
//             {data.map((book, index) => (
//               <Card
//                 key={book._id || book.id || index}
//                 data={book}
//                 variant={book.status}
//               />
//             ))}
//           </div>
//         ) : (
//           <div className="text-center py-10">
//             <img
//               src="/images/no-data.png"
//               alt="No books found"
//               className="mx-auto mb-3 w-32 h-32 object-contain"
//             />
//             <h3 className="text-gray-600 text-lg">No books found.</h3>
//           </div>
//         )}

//         {!loading && paginationData && (
//           <Pagination
//             filters={filters}
//             data={paginationData}
//             handler={filterHandler}
//           />
//         )}
//       </div>
//     </Layout>
//   );
// }

// // ✅ Server-side: get role and author name from cookie
// export async function getServerSideProps({ req }) {
//   const role = req.cookies._r || null;
//   const userCookie = req.cookies._u;

//   let userName = null;

//   try {
//     const parsed = userCookie ? JSON.parse(decodeURIComponent(userCookie)) : null;
//     userName = parsed?.name || null;
//   } catch (err) {
//     userName = null;
//   }

//   return {
//     props: {
//       role,
//       userName,
//     },
//   };
// }

// ✅ NEW CHANGE UPDATE — Author can only see their own books
import Button from "@/components/Button";
import Layout from "@/layout/Layout";
import Card from "@/modules/books/Card";
import FilterBar from "@/modules/FilterBar";
import Loader from "@/modules/Loader";
import Pagination from "@/modules/Pagination";
import { getAllBooks } from "@/services/APIs/books";
import { debounce } from "@/Utilities/helpers";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";

export default function Index({ role, userName }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [paginationData, setPaginationData] = useState(null);
  const router = useRouter();

  const [filters, setFilters] = useState({
    keyword: "",
    status: "",
    sort: "",
    page: 1,
    limit: 10,
  });

  const filterHandler = useCallback((keyword, status, page, limit, sort) => {
    const newFilters = {
      keyword: keyword ?? "",
      status: status ?? "",
      sort: sort ?? "",
      page: page ?? 1,
      limit: limit ?? 10,
    };
    setFilters(newFilters);
    fetchData(newFilters);
  }, []);

  const debouncedFilterHandler = useCallback(
    debounce((keyword, status, page, limit, sort) => {
      filterHandler(keyword, status, page, limit, sort);
    }, 400),
    [filterHandler]
  );

  const fetchData = async (queryFilters = filters) => {
    setLoading(true);
    const response = await getAllBooks();

    if (response?.status) {
      let books = response.data;

      // ✅ FILTER BOOKS BY LOGGED-IN AUTHOR
      // if (role === "author") {
      //   books = books.filter(
      //     (book) =>
      //       book.author &&
      //       book.author.name &&
      //       book.author.name.toLowerCase() === userName.toLowerCase()
      //   );
      // }
      if (role === "author" && userName) {
        books = books.filter((book) => 
          book.author &&
          book.author.name &&
          userName &&
          book.author.name.toLowerCase() === userName.toLowerCase()
        );
      } else if (role === "author" && !userName) {
        books = []; // fallback if userName is not defined
      }
      

      books = books.map((book) => ({
        ...book,
        status: book.status || "pending",
      }));

      if (queryFilters.keyword) {
        const keyword = queryFilters.keyword.toLowerCase();
        books = books.filter(
          (book) =>
            book.title?.toLowerCase().includes(keyword) ||
            book.author?.name?.toLowerCase().includes(keyword)
        );
      }

      if (queryFilters.status) {
        books = books.filter((book) => book.status === queryFilters.status);
      }

      if (queryFilters.sort === "1") {
        books.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      } else if (queryFilters.sort === "2") {
        books.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      }

      const start = (queryFilters.page - 1) * queryFilters.limit;
      const paginated = books.slice(start, start + queryFilters.limit);

      setData(paginated);
      setPaginationData({
        page: queryFilters.page,
        limit: queryFilters.limit,
        totalPages: Math.ceil(books.length / queryFilters.limit),
        totalResults: books.length,
      });
    } else {
      setData([]);
      setPaginationData({
        page: 1,
        limit: filters.limit,
        totalPages: 0,
        totalResults: 0,
      });
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Layout role={role}>
      <div className="w-full flex justify-between items-center flex-wrap md:flex-nowrap">
        <h1 className="text-2xl font-bold mb-2 md:mb-0">Books</h1>
        <Button
          variant="primary"
          className="md:w-auto w-full"
          onClick={() => router.push("/books/create")}
        >
          + Create Book
        </Button>
      </div>

      <div className="w-full mt-5 bg-white rounded-md p-4">
        <FilterBar
          data={data}
          sort={true}
          handler={filterHandler}
          debouncedHandler={debouncedFilterHandler}
          currentFilters={filters}
          placeholder="Search by book name, author"
        />

        {loading ? (
          <Loader />
        ) : data.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 py-4">
            {data.map((book, index) => (
              <Card
                key={book._id || book.id || index}
                data={book}
                variant={book.status}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-10">
            <img
              src="/images/no-data.png"
              alt="No books found"
              className="mx-auto mb-3 w-32 h-32 object-contain"
            />
            <h3 className="text-gray-600 text-lg">No books found.</h3>
          </div>
        )}

        {!loading && paginationData && (
          <Pagination
            filters={filters}
            data={paginationData}
            handler={filterHandler}
          />
        )}
      </div>
    </Layout>
  );
}

// ✅ Get role and user name from cookie
export async function getServerSideProps({ req }) {
  const role = req.cookies._r || null;
  const userCookie = req.cookies._u;

  let userName = null;
  try {
    const parsed = userCookie ? JSON.parse(decodeURIComponent(userCookie)) : null;
    userName = parsed?.name || null;
  } catch (err) {
    userName = null;
  }

  return {
    props: {
      role,
      userName,
    },
  };
}
