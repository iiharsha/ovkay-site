type ErrorMessageProps = {
  message?: string;
}

export default function ErrorMessage({ message }: ErrorMessageProps) {
  if (!message) return null
  return <span className="text-red-500 text-sm text-center mt-[2px]">{`${message}*`}</span>
}
