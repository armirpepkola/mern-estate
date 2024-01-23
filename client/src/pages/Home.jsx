import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Navigation } from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/css/bundle';
import ListingItem from '../components/ListingItem';
import { useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';

export default function Home() {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  SwiperCore.use([Navigation]);

  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch('/api/listing/get?offer=true&limit=3');
        const data = await res.json();
        setOfferListings(data);
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchRentListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=rent&limit=3');
        const data = await res.json();
        setRentListings(data);
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSaleListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=sale&limit=3');
        const data = await res.json();
        setSaleListings(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchOfferListings();
  }, []);

  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  return (
    <div className='flex flex-col items-center justify-center'>
      {/* top */}
      <div className='flex flex-col gap-6 p-12 px-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white w-full'>
        <h1 className='font-bold text-4xl lg:text-6xl text-center'>
          Discover Your Dream Home
        </h1>
        <div className='text-slate-100 text-lg sm:text-xl text-center'>
          Welcome to The Marketplace, where you can explore a variety of properties and find your perfect place to call home.
          <br />
          Start your journey now!
        </div>
        <form
          onSubmit={handleSubmit}
          className='bg-slate-100 p-3 rounded-lg flex items-center w-full max-w-md mx-auto shadow-md'
        >
          <input
            type='text'
            placeholder='What are you looking for?'
            className='bg-transparent focus:outline-none flex-grow text-slate-700'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button>
            <FaSearch className='text-teal-500' />
          </button>
        </form>
      </div>

      {/* listing results for offer, sale, and rent */}
      <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10'>
        {offerListings && offerListings.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-3xl font-semibold text-teal-500 mb-2'>Featured Offers</h2>
              <Link className='text-sm text-blue-800 hover:underline inline-block transition duration-300 ease-in-out transform hover:scale-105' to={'/search?offer=true'}>
                Explore more offers
              </Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {offerListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {rentListings && rentListings.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-3xl font-semibold text-teal-500 mb-2'>Places Available for Rent</h2>
              <Link className='text-sm text-blue-800 hover:underline inline-block transition duration-300 ease-in-out transform hover:scale-105' to={'/search?type=rent'}>
                Explore more places for rent
              </Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {rentListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {saleListings && saleListings.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-3xl font-semibold text-teal-500 mb-2'>Homes for Sale</h2>
              <Link className='text-sm text-blue-800 hover:underline inline-block transition duration-300 ease-in-out transform hover:scale-105' to={'/search?type=sale'}>
                Explore more homes for sale
              </Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {saleListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}