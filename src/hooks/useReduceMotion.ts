import { motion, useReducedMotion } from 'framer-motion'; 

  

function MovieCard({ movie }) { 

  const shouldReduce = useReducedMotion(); 

  

  const variants = { 

    hidden: { opacity: 0, y: shouldReduce ? 0 : 20 }, 

    visible: { opacity: 1, y: 0 }, 

  }; 

  

  return ( 

    <motion.div 
      variants={variants} 
      initial='hidden' 
      animate='visible' 

    > 
      {movie.title} 
    </motion.div> 
  ); 

} 