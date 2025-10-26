import { Injectable } from '@angular/core';
import { Observable, delay, of, throwError } from 'rxjs';
import { IProduct } from '../interfaces/product';

@Injectable({ providedIn: 'root' })
export class MockProductService {
  private readonly DELAY_MS = 1500;
  private products: IProduct[] = [
    {
      id: 1,
      title: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
      price: 109.95,
      description:
        'Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday',
      category: "men's clothing",
      image: 'https://viverdeblog.com/wp-content/uploads/2017/04/como-escrever-um-livro-topo.png',
    },
    {
      id: 2,
      title: 'Mens Casual Premium Slim Fit T-Shirts',
      price: 22.3,
      description:
        'Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing.',
      category: "men's clothing",
      image: 'https://viverdeblog.com/wp-content/uploads/2017/04/como-escrever-um-livro-topo.png',
    },
    {
      id: 3,
      title: 'Mens Cotton Jacket',
      price: 55.99,
      description:
        'Great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping, mountain/rock climbing, cycling, traveling or other outdoors.',
      category: "men's clothing",
      image: 'https://m.media-amazon.com/images/I/71JCtuGbc4L.jpg',
    },
    {
      id: 4,
      title: 'Mens Casual Slim Fit',
      price: 15.99,
      description:
        'The color could be slightly different between on the screen and in practice. / Please note that body builds vary by person, therefore, detailed size information should be reviewed below on the product description.',
      category: "men's clothing",
      image: 'https://m.media-amazon.com/images/I/71JCtuGbc4L.jpg',
    },
    {
      id: 5,
      title: "John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet",
      price: 695,
      description:
        "From our Legends Collection, the Naga was inspired by the mythical water dragon that protects the ocean's pearl. Wear facing inward to be bestowed with love and abundance, or outward for protection.",
      category: 'jewelery',
      image: 'https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg',
    },
    {
      id: 6,
      title: 'Solid Gold Petite Micropave',
      price: 168,
      description:
        'Satisfaction Guaranteed. Return or exchange any order within 30 days.Designed and sold by Hafeez Center in the United States.',
      category: 'jewelery',
      image: 'https://m.media-amazon.com/images/I/71JCtuGbc4L.jpg',
    },
    {
      id: 7,
      title: 'White Gold Plated Princess',
      price: 9.99,
      description:
        "Classic Created Wedding Engagement Solitaire Diamond Promise Ring for Her. Gifts to spoil your love more for Engagement, Wedding, Anniversary, Valentine's Day...",
      category: 'jewelery',
      image:
        'https://img.freepik.com/fotos-gratis/fotografia-em-close-up-de-uma-rosa-vermelha-com-orvalho-em-cima-de-uma-preta_181624-28079.jpg?semt=ais_hybrid&w=740&q=80',
    },
    {
      id: 8,
      title: 'Pierced Owl Rose Gold Plated Stainless Steel Double',
      price: 10.99,
      description:
        'Rose Gold Plated Double Flared Tunnel Plug Earrings. Made of 316L Stainless Steel',
      category: 'jewelery',
      image:
        'https://img.freepik.com/fotos-gratis/fotografia-em-close-up-de-uma-rosa-vermelha-com-orvalho-em-cima-de-uma-preta_181624-28079.jpg?semt=ais_hybrid&w=740&q=80',
    },
    {
      id: 9,
      title: 'WD 2TB Elements Portable External Hard Drive - USB 3.0',
      price: 64,
      description:
        'USB 3.0 and USB 2.0 Compatibility Fast data transfers Improve PC Performance High Capacity; Compatibility Formatted NTFS for Windows 10, Windows 8.1, Windows 7; Reformatting may be required for other operating systems',
      category: 'electronics',
      image: 'https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg',
    },
    {
      id: 10,
      title: 'SanDisk SSD PLUS 1TB Internal SSD - SATA III 6 Gb/s',
      price: 109,
      description:
        'Easy upgrade for faster boot up, shutdown, application load and response (As compared to 5400 RPM SATA 2.5" hard drive; Based on published specifications and internal benchmarking tests using PCMark vantage scores)',
      category: 'electronics',
      image:
        'https://palaciodasferramentas.com.br/media/catalog/product/R/R/RRIZEAAVYURDFOCJSQTF.jpg?optimize=high&bg-color=255,255,255&fit=bounds&height=600&width=600&canvas=600:600',
    },
    {
      id: 11,
      title: 'Silicon Power 256GB SSD 3D NAND A55 SLC Cache Performance Boost',
      price: 109,
      description:
        '3D NAND flash are applied to deliver high transfer speeds Remarkable transfer speeds that enable faster bootup and improved overall system performance',
      category: 'electronics',
      image:
        'https://palaciodasferramentas.com.br/media/catalog/product/R/R/RRIZEAAVYURDFOCJSQTF.jpg?optimize=high&bg-color=255,255,255&fit=bounds&height=600&width=600&canvas=600:600',
    },
    {
      id: 12,
      title: "BIYLACLESEN Women's 3-in-1 Snowboard Jacket Winter Coats",
      price: 56.99,
      description:
        'Note:The Jackets is US standard size, Please choose size as your usual wear Material: 100% Polyester; Detachable Liner Fabric: Warm Fleece.',
      category: "women's clothing",
      image: 'https://fakestoreapi.com/img/51Y5NI-I5jL._AC_UX679_.jpg',
    },
  ];

  private nextId: number = 13;

  public getAllProducts(): Observable<IProduct[]> {
    return of([...this.products]).pipe(delay(this.DELAY_MS));
  }

  public getProductById(id: number): Observable<IProduct> {
    const product = this.products.find((p) => p.id === id);

    if (!product) {
      return throwError(() => new Error(`Produto com ID ${id} não encontrado`)).pipe(
        delay(this.DELAY_MS)
      );
    }

    return of({ ...product }).pipe(delay(this.DELAY_MS));
  }

  public createProduct(product: Omit<IProduct, 'id'>): Observable<IProduct> {
    const newProduct: IProduct = {
      ...product,
      id: this.nextId++,
    };

    this.products.push(newProduct);
    return of({ ...newProduct }).pipe(delay(this.DELAY_MS));
  }

  public updateProduct(id: number, product: IProduct): Observable<IProduct> {
    const index = this.products.findIndex((p) => p.id === id);

    if (index === -1) {
      return throwError(() => new Error(`Produto com ID ${id} não encontrado`)).pipe(
        delay(this.DELAY_MS)
      );
    }

    this.products[index] = { ...product, id };
    return of({ ...this.products[index] }).pipe(delay(this.DELAY_MS));
  }

  public deleteProduct(id: number): Observable<void> {
    const index = this.products.findIndex((p) => p.id === id);

    if (index === -1) {
      return throwError(() => new Error(`Produto com ID ${id} não encontrado`)).pipe(
        delay(this.DELAY_MS)
      );
    }

    this.products.splice(index, 1);
    return of(void 0).pipe(delay(this.DELAY_MS));
  }
}
