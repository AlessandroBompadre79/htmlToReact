  methodPlaceHolder(params) {
  /**
   * @param {Object} params - the params that are passed to this component
  commentsPlaceHolder    */
    // eslint-disable-next-line react/forbid-foreign-prop-types
    if(!this.validate(interfacePlaceHolderInterface.propTypes, params, 'interfacePlaceHolderInterface')) {
      return Promise.reject(VALIDATION_ERROR);
    };

    const body = JSON.stringify({
      request: params
    });
    return (
        TransportService.send(serviceEndpoint, body, { ...headers })
            .then((response) => {
                return response;
            })
            .catch((error) => {
                throw error;
            })
    );
  }