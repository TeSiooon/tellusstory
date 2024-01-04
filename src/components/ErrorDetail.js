import { motion } from "framer-motion";

const ErrorDetail = (props) => {
  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      className="text-red-600"
    >
      {props.message}
    </motion.div>
  );
};

export default ErrorDetail;
