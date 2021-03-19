import TransportService from '../../originary/service/transport.service';
import headers          from '../../originary/headers/headers';
import serviceSrc       from '../../originary/endpoints/source';
import check            from '../../originary/validation/validation.check';
{{importInterfacesPlaceholder}}import VALIDATION_ERROR from '../../originary/validation/validation.error';

const serviceEndpoint = `${serviceSrc}/PlaceHolder`;
class PlaceHolderService {
  validate(paramsTypes, params) {
    return check(paramsTypes, params, 'prop', );
  }
methodPlaceHolder
}

export default PlaceHolderService;
