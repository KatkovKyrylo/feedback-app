import {createContext, useState, useEffect} from 'react';
import {v4 as uuidv4} from 'uuid';

const FeedbackContext = createContext();

export const FeedbackProvider = ({children}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [feedback, setFeedback] = useState([]);
    const [feedbackEdit, setFeedbackEdit] = useState({
        item: {},
        edit: false
    });

    useEffect(() => {
        fetchFeedback()
    }, []);

    const fetchFeedback = async () => {
        const response = await fetch('https://my-json-server.typicode.com/666blessed/backend-for-feedback-app/feedback/');
        const data = await response.json();
        
        setFeedback(data);
        setIsLoading(false);
    }

    const addFeedback = async (newFeedback) => {
        const response = await fetch('https://my-json-server.typicode.com/666blessed/backend-for-feedback-app/feedback/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newFeedback),
        });

        const data = await response.json();
        data.id = uuidv4();     
       
        setFeedback([data, ...feedback]);
    };

    const deleteFeedback = async (id) => {
        if (window.confirm('Are you sure you want to delete?')) {
            await fetch(`https://my-json-server.typicode.com/666blessed/backend-for-feedback-app/feedback/${id}`, {method: 'DELETE'});

            setFeedback(feedback.filter((item) => item.id !== id));
        }
    };

    const editFeedback = item => {
        setFeedbackEdit({
            item, 
            edit: true
        });
    };

    const updateFeedback = async (id, updatedItem) => {
        const response = await fetch(`https://my-json-server.typicode.com/666blessed/backend-for-feedback-app/feedback/${id}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(updatedItem)
        });

        const data = await response.json();

        setFeedback(feedback.map((item) => item.id === id ? {...item, ...data} : item));
        setFeedbackEdit({item: {}, edit: false});
        
    };

    return <FeedbackContext.Provider value={{
       feedback,
       deleteFeedback,
       addFeedback,
       editFeedback,
       feedbackEdit,
       updateFeedback,
       isLoading,
    }}>
        {children}
    </FeedbackContext.Provider>
}

export default FeedbackContext;
