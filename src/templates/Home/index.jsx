import './styles.css';
import { useEffect, useState, useCallback } from 'react';
import { loadPosts } from '../../utils/load-posts'
import { Posts } from '../../components/Posts';
import { Button } from '../../components/Button'
import { TextInput } from '../../components/TextInput'

const Home = () => { 
  
  const [posts, setPosts ] = useState([]);
  const [allPosts, setAllPosts ] = useState([]);
  const [page, setPage ] = useState(0);
  const [postsPerPage] = useState(10);
  const [searchValue, setSearchValue ] = useState('');

  const noMorePosts = page + postsPerPage >= allPosts.length;
  const filteredPosts = !!searchValue ? allPosts.filter(post => { //condição de filtragem os posts
      return post.title.toLowerCase().includes(searchValue.toLowerCase());
    }): posts;


const handleLoadPosts = useCallback(async (page, postsPerPage) => {
  const postsAndPhotos = await loadPosts();

  setPosts(postsAndPhotos.slice(page, postsPerPage));
  setAllPosts(postsAndPhotos)
}, [])

useEffect(() => {
  handleLoadPosts(0, postsPerPage);
}, [handleLoadPosts, postsPerPage])

const loadMorePosts = () => {
   const nextPage = page + postsPerPage;
   const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);

   posts.push(...nextPosts);

   setPosts(posts);
   setPage(nextPage);
}

const handleChange = (e) => {
  const {value} = e.target;
  setSearchValue(value)
}

    return (
      <section className='container'> 
      <div className='search-container'>
        {!!searchValue && (
            <h1>Search value: {searchValue}</h1>
        )} 

        <TextInput searchValue={searchValue} actionFn={handleChange} /> 
        
        </div>

        {filteredPosts.length > 0 && ( //condição de renderização dos posts
          <Posts posts={filteredPosts} />
        )}

         {filteredPosts.length === 0 && ( //caso não renderize
          <p>Não existem posts</p>
        )}

        <div className='button-container'>
        {!searchValue && (
            <Button
            disabled={noMorePosts}
            text="Load more posts"
            onClick={loadMorePosts}
            />
        )}
        </div>
      </section>
    );
}

export default Home;
  
         
