
import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import ServiceDetail from '@/components/services/ServiceDetail';
import servicesData from '@/data/servicesData';

const ServiceDetailPage = () => {
  const { slug } = useParams();
  const service = servicesData.find(s => s.slug === slug);
  
  if (!service) {
    return <Navigate to="/services" replace />;
  }
  
  return <ServiceDetail service={service} />;
};

export default ServiceDetailPage;
