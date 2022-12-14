import React, { useState,useEffect } from 'react';
import { booksApi } from '../../store/services';

//CSS Module
import classes from './CheckoutHeader.module.css';

//Components
import BookOnCard from '../BookOnCard/BookOnCard';
import CollectionOnCard from '../BookOnCard/CollectionOnCard';
import CartEmpty from '../CartEmpty/CartEmpty';

const CheckoutHeader = props => {

    // eslint-disable-next-line
    const {bookItems,collectionItems,cart} = props;
    // eslint-disable-next-line
    const [books,setBooks]=useState();
    // eslint-disable-next-line
    const [collections,setCollections]=useState();
    const {refetch} = booksApi.useGetCartQuery();
    const [removeFromCart] = booksApi.useRemoveFromCartMutation();

    useEffect(() => {
        setBooks(bookItems)
        setCollections(collectionItems)
    }, []);

    // eslint-disable-next-line
    const remove= (id)=>{
        removeFromCart({bookIds:id}  ).then((r)=>{
            refetch()             
        })
    }
    return (
    <>
      <div className={`col-12 ${classes.header}`}>
        <div className={`row`}>
            <div className={`col-8`}>
                <h4>Book</h4>
            </div>
            <div className={`col-4`}>
                <h4>Total Price</h4>
            </div>
        </div>  
        </div>
        <div className={`col-12`}>
            <div className={`row`}>
                {
                    bookItems.length === 0 && collectionItems.length === 0 ? 
                    
                    
                    <div className="col-lg-12 col-md-12 col-sm-12">
                         <CartEmpty />
                    </div>
                    :null
                }
                {
                    bookItems !== undefined ?
                    bookItems.map(item => {
                            return (
                                <BookOnCard  key={item._id} data={item}  />
                            )
                    })  :
                    null
                }

                {collectionItems !== undefined ?
                    collectionItems.map((collection)=>{
                        return ( 
                            <>
                                <h6 className="text-muted mb-2 pb-2">Collections</h6>
                                <CollectionOnCard key={collection._id} data={collection} />

                            </>
                        )
                    })
                    :
                    null
                }
            </div>  
        </div>
        </>
        
    )
}
export default CheckoutHeader;