import { createContext, useState, useEffect, use } from "react";

const NotificationContext = createContext({
    notification: null,
    showNotification: function(notificationData){},
    hideNotification: function(){}
})

export function NotificationContextProvider(props){
    const [activeNotification, setActiveNotifications ] = useState(null)

    useEffect(() => {
      if(activeNotification && (activeNotification.status === 'success' || activeNotification.status === 'error')){
        const timer = setTimeout(() => {
            setActiveNotifications(null)
          }, 3000);
          
        return () => {
            clearTimeout(timer);
        }
      }

    }, [activeNotification])

    function showNotificationHandler(notificationData){
        setActiveNotifications(notificationData)
    }

    function hideNotificationHandler (notificationData){
        setActiveNotifications(null)
    }

    const context = {
        notification: activeNotification,
        showNotification: showNotificationHandler,
        hideNotification: hideNotificationHandler
    }


    return(
        <NotificationContext.Provider value={context}>{props.children}</NotificationContext.Provider>
    )
}


export default NotificationContext;