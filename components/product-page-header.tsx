"use client"
import Header from "@/components/header"
import { useRouter } from 'next/navigation';

export default function ProductPageHeader() {
  const router = useRouter();

  const setCurrentPage = (page: string) => {
    console.log(`Navegando a: ${page}`);
    if (page === 'inicio') {
      router.push('/');
    } else if (page === 'velas') {
      router.push('/usuario/velas');
    } else if (page === 'decorativos') {
      router.push('/usuario/decorativos');
    } else if (page === 'waxMelts') {
      router.push('/usuario/wax-melts');
    } else if (page === 'accesorios') {
      router.push('/usuario/accesorios'); 
    } else if (page === 'all') {
      router.push('/usuario/all');
    } else if (page === 'esencias') {
      router.push('/usuario/esencias');
    } else if (page === 'carrito') {
      router.push('/carrito');
    } else if (page === 'envios-devoluciones') {
      router.push('/envios-devoluciones');
    } else {
      console.log(`Implementar navegación para: ${page}`);
    }
  }

  return <Header setCurrentPage={setCurrentPage} />
}