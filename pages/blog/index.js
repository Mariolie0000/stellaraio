import { useState, useEffect, Children  }  from 'react'
import {Row, Col, Spinner } from 'reactstrap'

import Buttons from '../../components/Generals/Buttons'
import Search from '../../assets/svgs/Search'
import Star from '../../assets/svgs/Star'
import BlogCardLg from '../../components/Blog/BlogCardLg'
import BlogCardSm from '../../components/Blog/BlogCardSm'

import glowmd from '../../assets/imgs/blog/Path 9.png'
import Kor from '../../assets/imgs/blog/kor.png'
import Retail from '../../assets/imgs/blog/retail.png'
import Restock from '../../assets/imgs/blog/restock.png'
import Rightarrowsm from '../../assets/svgs/Rightarrowsm'
import BlogService from '../../services/BlogService'
import { useRouter} from 'next/router'
import Link from 'next/link'


/* import {setBlogs,  setTotalPages, setTopPosts} from '../../store/actions' */
/* import { useSelector, useDispatch } from "react-redux"; */
import Posts from '../../components/Blog/Posts'


function Blog() {
  const [blogs, setBlogs] = useState([])
  
  const [firstBlog, setFirstBlog]= useState(null)
  const [blogArr, setBlogArr] = useState([])
  const [totalPages, setTotalPages] = useState(1)

  
  const [topPostLoading, setTopPostLoading] = useState(false)
  const [topPosts, setTopPosts] = useState(null)
  
  const router = useRouter()
  /* const [page, setPage] = useState(1) */
  const {page} = router.query

  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState(null)

  const pagesQuery = parseInt(page)
  const pages = (isNaN(pagesQuery) || typeof(pagesQuery) !== 'number') ? 1 : pagesQuery
  const postPerPage = 7
  useEffect(()=>{
    run()
    getTopPosts() 
  },[page])



  async function run (){
    const query = `per_page=${postPerPage}&page=${pages}&_fields=id,title,content,acf`
    setIsLoading(true)
    try{
      const res = await BlogService.getBlogs(query)
      const result = res.data
      setTotalPages(res.headers["x-wp-totalpages"])
      setBlogs(res.data)
      setFirstBlog(result.shift())
      setBlogArr(result)
      setIsLoading(false)
    } catch(e){ 
      setErrors(e)
      setIsLoading(false)
    }
  }
  async function getTopPosts (){
    setTopPostLoading(true)
    const query = `per_page=4&_fields=id,title,content,acf`
    try {
      const res = await BlogService.getTopPosts(query)
      setTopPosts(res.data)
    } catch (e) {
      setErrors({...errors, topPost: true})
    }
  }

  const handleSetPage = (key) =>{
    if(pages === key){
      return
    }
    if(isLoading){
      return
    }
    /* setPage(key) */
    /* run() */
    router.push(`/blog?page=${key}`)
  }
  const prev = () =>{
    if(pages === 1){
      return
    }
    if(isLoading){
      return
    }
    /* setPage(page-1) */
    router.push(`/blog?page=${pages-1}`)
  }
  const next = () =>{
    if(pages >= totalPages){
      return
    }
    if(isLoading){
      return
    }
    /* setPage(page+1)
    console.log('i git here next');
    run() */
    router.push(`/blog?page=${pages+1}`)
  }
  return (
    <>
      <section className="blog">
        <Row className='mb-30px mt-30px'>
          <Col md={8}>
            <h1 className="app-h1">Blog</h1>
          </Col>
          <Col className='ps-5' md={4}>
            <div className="search">
              <input type="text" placeholder='search'/>
              <Buttons border='none' width={'39px'} height={'32.5px'} text={<Search/>}></Buttons>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={8}>
            {firstBlog && <BlogCardLg blog={firstBlog}/>}
            
            <Row>
              { blogArr ? blogArr.map((blog, key)=>(
                <Col key={key} md={6}>
                  <BlogCardSm blog={blog}/>
                </Col>
              )): <Spinner color="primary" 
                style={{
                  height: '6rem',
                  width: '6rem'
                }}
                >
                Loading...
              </Spinner>
              }
              
              
              
              <div className="blog-pagination">
                {
                  pages > 1 && <div onClick={prev} className="blog-pag-btn pag-left">
                  <Rightarrowsm/>
                </div>
                }
                
                {
                  totalPages &&
                  Array(parseInt(totalPages)).fill(0).map((_, i) => {
                    return (
                      <div key={i+1} onClick={()=>{handleSetPage(i+1)}} className={`blog-pag-btn ${pages === i+1 ? 'pag-active' : ''}`}>
                      {i+1}
                    </div>
                    )
                  })
                  
                }
                <div onClick={next} className="blog-pag-btn">
                  <Rightarrowsm/>
                </div>
                {/* {activePage < totalPages && <div onClick={next} className="blog-pag-btn">
                  <Rightarrowsm/>
                </div>} */}
                
              </div>
            </Row>
          </Col>
          <Col className='blog-right-sidebar'  md={4}>
            <div className="blog-top-posts">
              <div className="top-post-header mb-20px d-flex align-items-center">
                <Star/>
                <h5 className='ms-3 mb-0 app-h5'>Top Posts</h5>
                <div className="blog-top-post-glow">
                  <img src={glowmd} alt="" />
                </div>
              </div>
              {topPosts ? <Posts posts={topPosts} /> : <div className='d-flex justify-content-center'>
                <Spinner 
                  style={{
                    height: '3rem',
                    width: '3rem',
                    color: '#c32ef5'
                  }}
                  >
                  Loading...
                </Spinner> 
            </div> }
              
            </div>
            <div className="blog-socials">
              <div className="top-post-header mb-20px d-flex align-items-center">
                <Star/>
                <h5 className='ms-3 mb-0 app-h5'>Instagram</h5>
                  <div className="blog-top-post-glow">
                    <img src={glowmd} alt="" />
                  </div>
              </div>
              <div className="blog-socials-content d-flex justify-content-between align-items-center">
                <div className="blog-socials-img">
                  <img src={Kor} alt="img" />
                </div>
                <div className="blog-socials-img">
                  <img src={Retail} alt="img" />
                </div>
                <div className="blog-socials-img">
                  <img src={Restock} alt="img" />
                </div>
                <div className="blog-socials-img">
                  <img src={Kor} alt="img" />
                </div>
                <div className="blog-socials-img">
                  <img src={Retail} alt="img" />
                </div>
                <div className="blog-socials-img">
                  <img src={Restock} alt="img" />
                </div>
              </div>
            </div>
            <div className="blog-socials">
              <div className="top-post-header mb-20px d-flex align-items-center">
                <Star/>
                <h5 className='ms-3 mb-0 app-h5'>Twitter</h5>
                  <div className="blog-top-post-glow">
                    <img src={glowmd} alt="" />
                  </div>
              </div>
              <div className="blog-socials-content d-flex justify-content-between align-items-center">
                <div className="blog-socials-img">
                  <img src={Kor} alt="img" />
                </div>
                <div className="blog-socials-img">
                  <img src={Retail} alt="img" />
                </div>
                <div className="blog-socials-img">
                  <img src={Restock} alt="img" />
                </div>
                <div className="blog-socials-img">
                  <img src={Kor} alt="img" />
                </div>
                <div className="blog-socials-img">
                  <img src={Retail} alt="img" />
                </div>
                <div className="blog-socials-img">
                  <img src={Restock} alt="img" />
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </section>
    </>
  )
}

export default Blog

/* export const getStaticProps = async (context) =>{
  
  let blogss = []
  let totalPages = ''
  let firstBlogg= null
  let blogArrr = []
  const postPerPage = 7
  const query = `per_page=${postPerPage}&page=${1}&_fields=id,title,content,acf`
    try{
      const res = await BlogService.getBlogs(query)
      const result = res.data
      blogss = res.data
      totalPages = res.headers["x-wp-totalpages"]
      firstBlogg = result.shift()
      blogArrr = result
    
    } catch(e){ 
      console.log(e)
    }

    return{
      props:{
        blogss,
        totalPages,
        firstBlogg,
        blogArrr
       
      }
      
    }
} */