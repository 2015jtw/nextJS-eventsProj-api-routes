import { createContext, useState } from "react";

const NotificationContext = createContext({
    notification: null,
    showNotification: function(){},
    hideNotification: function(){}
})

export function NotificationContextProvider(props){
    const [activeNotification, setActiveNotifications ] = useState(null)

    function showNotificationHandler(notificationData){
        setActiveNotifications({notificationData})
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