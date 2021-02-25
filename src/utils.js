export default function formattedNumber(n) {
    return String(n).replace(/(.)(?=(\d{3})+$)/g, '$1 ')
}
