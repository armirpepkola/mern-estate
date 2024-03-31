import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Navigation } from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/css/bundle';
import ListingItem from '../components/ListingItem';
import { useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import { AiOutlineInteraction } from "react-icons/ai";
import { TiUserAddOutline } from "react-icons/ti";
import { FaHouseChimneyMedical } from "react-icons/fa6";
import videoBG from '../assets/videos/Real Estate Videography.mp4';

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
    <div className='flex flex-col items-center justify-center bg-teal-50'>
      {/* top */}
      <div className='relative flex items-center h-screen overflow-hidden flex-col bg-gradient-to-r from-teal-500 to-teal-600 text-white w-full'>
        <div className='z-20 py-56 flex flex-col gap-6 px-3 inset-0 bg-teal-900 bg-opacity-40 w-auto min-w-full min-h-full max-w-none'>
          <h1 className='font-bold text-4xl lg:text-6xl text-center'>
            Discover Your Dream Home
          </h1>
          <div className='text-slate-100 text-lg sm:text-xl text-center'>
            Welcome to RealEstate Marketplace, where you can explore a variety of properties and find your perfect place to call home.
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
        
        <video src={videoBG} autoPlay loop muted className='absolute z-10 w-auto min-w-full min-h-full max-w-none' />
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

      {/* about us */}
      <div className="hero min-h-96 bg-fixed" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1448630360428-65456885c650?q=80&w=2067&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)'}}>
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-6xl py-20">
            <h1 className="mb-5 text-5xl font-bold">About Albanian Realty Marketplace</h1>
            <p className="mb-5">
            Welcome to Albanian Realty Marketplace, your go-to destination for finding the perfect property in the heart of Albania. At our marketplace, we are committed to helping you discover homes that match your dreams and aspirations.

            Explore a diverse range of properties, from modern apartments with breathtaking views to charming houses nestled in picturesque neighborhoods. Our platform is designed to make your real estate journey seamless, whether you're looking to buy, sell, or rent.

            We understand that finding the right home is a personal and significant decision. That's why Albanian Realty Marketplace goes beyond listings, providing you with the tools and resources needed to make informed choices. Our team of experts is dedicated to ensuring your real estate experience is both enjoyable and successful.

            Join us on this exciting journey as we redefine the way you experience real estate. Discover the beauty of Albanian properties and let us be your trusted partner in finding the home that feels just right for you.
            </p>
            <Link to='/about'>
              <button className='btn glass text-white hover:text-slate-900 transition duration-300'>
                Learn More
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* how to use */}
      <div className='flex flex-col items-center justify-center min-h-96 py-24'>
        <h2 className='text-3xl font-semibold text-teal-500 text-center mb-10'>How to list your property?</h2>
        <ul className="timeline">
          <li>
            <div className="timeline-start timeline-box">Create an account</div>
            <hr/>
          </li>
          <li>
            <hr/>
            <div className="timeline-end timeline-box">Update your profile</div>
            <hr/>
          </li>
          <li>
            <hr/>
            <div className="timeline-start timeline-box">Post your listing</div>
            <hr/>
          </li>
          <li>
            <hr/>
            <div className="timeline-end timeline-box">Sell your property</div>
            <hr/>
          </li>
          <li>
            <hr/>
            <div className="timeline-start timeline-box">BE HAPPY!</div>
          </li>
        </ul>
        <div className="stats shadow mt-5">
  
          <div className="stat">
            <div className="stat-figure text-teal-500">
              <AiOutlineInteraction style={{ fontSize: '32px' }} />
            </div>
            <div className="stat-title">Interactions</div>
            <div className="stat-value">31K</div>
            <div className="stat-desc">Last Month</div>
          </div>
          
          <div className="stat">
            <div className="stat-figure text-teal-500">
              <TiUserAddOutline style={{ fontSize: '32px' }} />
            </div>
            <div className="stat-title">New Users</div>
            <div className="stat-value">4,200</div>
            <div className="stat-desc">↗︎ 400 (22%)</div>
          </div>
          
          <div className="stat">
            <div className="stat-figure text-teal-500">
              <FaHouseChimneyMedical style={{ fontSize: '32px' }} />
            </div>
            <div className="stat-title">New Listings</div>
            <div className="stat-value">1,200</div>
            <div className="stat-desc">↗︎ 90 (14%)</div>
          </div>
          
        </div>  
      </div>
    </div>
  );
}