import React, {useState, useEffect} from "react";
import Modal from "../../components/UI/Modal/Modal";
import Auxiliary from "../Auxiliary";

const withErrorHandler = (WrappedComponent, axios) => {
    return props => {
        const [error, setError] = useState(null);

        const reqInterceptor = axios.interceptors.request.use(req => {
            setError(null);
            return req;
        });
        const resInterceptor = axios.interceptors.response.use(res => res, error => {
            setError(error);
        });

        useEffect(() => {
            return () => {
                axios.interceptors.request.eject(reqInterceptor);
                axios.interceptors.response.eject(resInterceptor);
            }
        }, [reqInterceptor, resInterceptor]);

        const closeModal = () => {
            setError(null);
        };

        return (
            <Auxiliary>
                <Modal
                    show={error}
                    closed={closeModal}>
                    {error ? this.state.error.message : null}
                </Modal>
                <WrappedComponent {...props} />
            </Auxiliary>
        );
    }
};

export default withErrorHandler;
