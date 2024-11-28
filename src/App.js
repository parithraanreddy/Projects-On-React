import React, { useState } from 'react';
import './App.css';
import SearchComponent from './components/SearchComponent';
import ShowCourseComponent from './components/ShowCourseComponent';
import UserCartComponent from './components/UserCartComponent';

function App() {
    const [courses, setCourses] = useState([
        { id: 1, 
        name: 'T-Shirt', 
        price: 499, 
        image: 
'https://files.cdn.printful.com/o/upload/bfl-image/f5/10333_l_collage%20vintage%20design%20.jpg'
        },
        { id: 2, 
        name: 'Hand Bag', 
        price: 699, 
        image: 
'https://www.themessycorner.in/cdn/shop/files/IMG_2749_1200x.jpg?v=1728207693'
        },
        { id: 3, 
        name: 'Hoodie', 
        price: 799, 
        image: 
'https://assets.myntassets.com/dpr_1.5,q_60,w_400,c_limit,fl_progressive/assets/images/2024/SEPTEMBER/5/3nB2WwUy_88e22281220e48ab995add35d3e7ac54.jpg'
        }
    ]);

    const [cartCourses, setCartCourses] = useState([]);
    const [searchCourse, setSearchCourse] = useState('');

    const addCourseToCartFunction = (GFGcourse) => {
        const alreadyCourses = cartCourses
                            .find(item => item.product.id === GFGcourse.id);
        if (alreadyCourses) {
            const latestCartUpdate = cartCourses.map(item =>
                item.product.id === GFGcourse.id ? { 
                ...item, quantity: item.quantity + 1 } 
                : item
            );
            setCartCourses(latestCartUpdate);
        } else {
            setCartCourses([...cartCourses, {product: GFGcourse, quantity: 1}]);
        }
    };

    const deleteCourseFromCartFunction = (GFGCourse) => {
        const updatedCart = cartCourses
                            .filter(item => item.product.id !== GFGCourse.id);
        setCartCourses(updatedCart);
    };

    const totalAmountCalculationFunction = () => {
        return cartCourses
            .reduce((total, item) => 
                        total + item.product.price * item.quantity, 0);
    };

    const courseSearchUserFunction = (event) => {
        setSearchCourse(event.target.value);
    };

    const filterCourseFunction = courses.filter((course) =>
        course.name.toLowerCase().includes(searchCourse.toLowerCase())
    );

    return (
        <div className="App">
            <SearchComponent searchCourse={searchCourse} 
                            courseSearchUserFunction=
                                {courseSearchUserFunction} />
            <main className="App-main">
                <ShowCourseComponent
                    courses={courses}
                    filterCourseFunction={filterCourseFunction}
                    addCourseToCartFunction={addCourseToCartFunction}
                />

                <UserCartComponent
                    cartCourses={cartCourses}
                    deleteCourseFromCartFunction={deleteCourseFromCartFunction}
                    totalAmountCalculationFunction={
                        totalAmountCalculationFunction
                    }
                    setCartCourses={setCartCourses}
                />
            </main>
        </div>
    );
}

export default App;
