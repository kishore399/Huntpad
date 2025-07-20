export function formatDate(date) {
    return new Date(date).toLocaleTimeString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric"
    });
}