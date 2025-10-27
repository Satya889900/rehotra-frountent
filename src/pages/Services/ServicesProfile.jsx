import React, { useEffect, useState } from 'react'
import api from '../../api/axios'
import { useParams } from 'react-router-dom';

export default function Services(){
  const [profile, setProfile] = useState(null)
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const { id } = useParams();

  useEffect(()=>{ load() },[])
  
  const load = async () => {
    try {
      setLoading(true)
      setError(null)

      // This data would typically come from an API call like `api.get(`/services/${id}`)`
      // For now, we'll use the data from the list page to find the correct person.
      const servicesData = [
        { id: 1, name: "Priyanka", phone: "+91 8907654321", service: "Electrician", verified: true, avatar: "https://i.pravatar.cc/150?img=1" },
        { id: 2, name: "Neha", phone: "+91 8907654321", service: "Plumber", verified: true, avatar: "https://i.pravatar.cc/150?img=2" },
        { id: 3, name: "Abhishek", phone: "+91 8907654321", service: "Carpenter", verified: true, avatar: "https://i.pravatar.cc/150?img=3" },
        { id: 4, name: "Rahul", phone: "+91 8907654321", service: "Painter", verified: true, avatar: "https://i.pravatar.cc/150?img=4" },
        { id: 5, name: "Amit", phone: "+91 8907654321", service: "Electrician", verified: true, avatar: "https://i.pravatar.cc/150?img=5" },
        { id: 6, name: "Ankita", phone: "+91 8907654321", service: "Carpenter", verified: false, avatar: "https://i.pravatar.cc/150?img=6" },
        { id: 7, name: "Ashish", phone: "+91 8907654321", service: "Plumber", verified: true, avatar: "https://i.pravatar.cc/150?img=7" },
        { id: 8, name: "Deepak", phone: "+91 8907654321", service: "Electrician", verified: false, avatar: "https://i.pravatar.cc/150?img=8" },
        { id: 9, name: "Anjali", phone: "+91 8907654321", service: "Plumber", verified: false, avatar: "https://i.pravatar.cc/150?img=9" },
        { id: 10, name: "Rohit", phone: "+91 8907654321", service: "Plumber", verified: true, avatar: "https://i.pravatar.cc/150?img=10" },
        { id: 11, name: "Ajay KS", phone: "+91 7412435678", service: "Plumber", verified: true, avatar: "https://i.pravatar.cc/150?img=11" },
      ];

      const person = servicesData.find(p => p.id === parseInt(id));

      if (!person) {
        setError(`Service provider with ID ${id} not found.`);
        setLoading(false);
        return;
      }

      const profileData = {
        name: person.name,
        avatar: person.avatar,
        phone: person.phone,
        profession: person.service,
        verified: person.verified,
        dob: '26/11/2002',
        gender: 'Male',
        referredBy: 'Ravi Kumar',
        aadhaar: 'RO123456789012',
        joinedDate: '26/11/2002',
        address: '#123, 3rd flr, 4th Cross 5th main, RR Nagar, Bengaluru 560068 (native)',
        religion: 'Hindu',
        electricalLicense: 'EL20KA105',
        tradeLicense: 'Business License',
        serviceRange: '5 Kms',
        chargesPerService: 500,
        chargesPerDay: 1000,
        chargesPerMonth: 2500
      }
      const mockServices = [
        {
          id: 1,
          building: 'Ganesh Residency (FL101)',
          amount: 500,
          serviceDate: '03 Mar 2025',
          transactionMode: 'UPI (Pay)'
        },
        {
          id: 2,
          building: 'Anita Villa',
          amount: 1000,
          serviceDate: '03 Feb 2025',
          transactionMode: 'UPI (Pay)'
        },
        {
          id: 3,
          building: 'Vikram Apartments (FL101, FL102, FL103)',
          amount: 5000,
          serviceDate: '05 Jan 2025',
          transactionMode: 'UPI (Pay)'
        }
      ]
      
      setProfile(profileData)
      setServices(mockServices)
    } catch (error) {
      console.error('Error loading data:', error)
      setError('Failed to load data. Please try refreshing the page.')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="p-6 flex justify-center items-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-6 flex justify-center items-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="text-red-600 mb-4">Error</div>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={load} 
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="p-6 bg-gray-50">
        <p>No profile data available.</p>
      </div>
    )
  }

  const workingHours = [
    { day: 'Monday', time: '9 AM to 5 PM' },
    { day: 'Tuesday', time: '9 AM to 5 PM' },
    { day: 'Wednesday', time: '9 AM to 5 PM' },
    { day: 'Thursday', time: '9 AM to 5 PM' },
    { day: 'Friday', time: '9 AM to 5 PM' },
    { day: 'Saturday', time: '9 AM to 5 PM' },
    { day: 'Sunday', time: 'N/A' }
  ]

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Services</h1>
      
      {/* Single Card for Profile, License, and Working Hours */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 lg:gap-6 p-6">
          {/* Profile Section */}
          <div className="lg:pr-6 pb-6 lg:pb-0 lg:border-r lg:border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Profile</h2>
            <div className="flex">
              <div className="shrink-0 mr-4">
                <img 
                  src={profile.avatar} 
                  alt={profile.name} 
                  className="w-24 h-24 rounded-full"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-xl font-bold text-gray-900 mb-1 flex items-center">
                  {profile.name}
                  {profile.verified && (
                    <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Verified
                    </span>
                  )}
                </h3>
                <div className="space-y-3 text-sm text-gray-600">
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span className="truncate">{profile.phone}</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {profile.dob}
                  </div>
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                    </svg>
                    {profile.gender}
                  </div>
                 
                  <div className="flex items-start">
                    <svg className="w-4 h-4 mr-2 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <div className="min-w-0 flex-1">
                      <div className="font-medium text-gray-900 mb-0.5">Added by Ravi Kumar</div>
                      <div className="truncate">{profile.aadhaar}</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Date of Joined {profile.joinedDate}
                  </div>
                  <div className="flex items-start">
                    <svg className="w-4 h-4 mr-2 mt-0.5 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.414a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <div className="min-w-0 flex-1">
                      <div className="font-medium text-gray-900 mb-0.5">Address</div>
                      <div className="truncate">{profile.address}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* License Section */}
          <div className="lg:px-6 py-0 lg:py-6 lg:border-r lg:border-gray-200">
            <div className="space-y-4 text-sm text-gray-600">
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-2 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3.75a2.25 2.25 0 002.25 2.25h3A2.25 2.25 0 0018 3.75V1.5m-6 0v2.25A2.25 2.25 0 0010.5 6h3a2.25 2.25 0 002.25-2.25V1.5m-6 0h3" />
                </svg>
                {profile.religion}
              </div>
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-2 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                {profile.profession}
              </div>
              <div className="flex items-start">
                <svg className="w-4 h-4 mr-2 mt-0.5 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
                <div className="min-w-0 flex-1">
                  <div className="font-medium text-gray-900 mb-0.5">Business License</div>
                  <div className="truncate">({profile.electricalLicense})</div>
                </div>
              </div>   
              <div className="flex items-start">
                <svg className="w-4 h-4 mr-2 mt-0.5 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                <div className="min-w-0 flex-1">
                  <div className="font-medium text-gray-900 mb-0.5">Service Range (Offline)</div>
                  <div className="truncate">{profile.serviceRange}</div>
                </div>
              </div>
              <div className="pt-4 border-t border-gray-200 space-y-2">
                       <h2 className="text-lg font-semibold text-gray-900 mb-4">Charges</h2>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Per Service</span>
                  <span className="font-medium text-gray-900">₹{profile.chargesPerService}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Per Day</span>
                  <span className="font-medium text-gray-900">₹{profile.chargesPerDay}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Per Month</span>
                  <span className="font-medium text-gray-900">₹{profile.chargesPerMonth}</span>
                </div>
              </div>
            </div>
          </div>
          

          {/* Working Hours Section */}
          <div className="lg:pl-6 py-0 lg:py-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Working Hours</h2>
            <div className="space-y-2 text-sm">
              {workingHours.map((hour, index) => (
                <div key={index} className="flex justify-between py-1">
                  <span className="text-gray-600">{hour.day}</span>
                  <span className="font-medium text-gray-900">{hour.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Services Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Services</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Building & Apartment</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transaction Mode</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {services.map((service, index) => (
                <tr key={service.id || index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {service.building}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ₹{service.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {service.serviceDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {service.transactionMode}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}