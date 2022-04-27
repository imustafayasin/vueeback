export default function notification(message, type) {
    try {
        const CLASS_NAME = "notification";

        if (!message) throw new Error("Message not be null")
        // if (type !== "success" || type !== "error") throw new Error(`Unknown type ${type}. please use success or error`);
        if (document.querySelector(`.${CLASS_NAME}[show]`)) return
        let notification = document.createElement("div");
        notification.innerText = message;
        notification.classList.add(`${CLASS_NAME}`, type);
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.setAttribute("show", "");
        }, 500);

        setTimeout(() => {
            notification.removeAttribute("show");
            notification.addEventListener('transitionend', () => notification.remove())
        }, 2500)

    } catch (error) {
        console.error(error)
    }
}
