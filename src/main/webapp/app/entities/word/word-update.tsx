import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ICategory } from 'app/shared/model/category.model';
import { getEntities as getCategories } from 'app/entities/category/category.reducer';
import { ICountry } from 'app/shared/model/country.model';
import { getEntities as getCountries } from 'app/entities/country/country.reducer';
import { IArabicSound } from 'app/shared/model/arabic-sound.model';
import { getEntities as getArabicSounds } from 'app/entities/arabic-sound/arabic-sound.reducer';
import { getEntity, updateEntity, createEntity, reset } from './word.reducer';
import { IWord } from 'app/shared/model/word.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IWordUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const WordUpdate = (props: IWordUpdateProps) => {
  const [idscategory, setIdscategory] = useState([]);
  const [countryId, setCountryId] = useState('0');
  const [arabicSoundId, setArabicSoundId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { wordEntity, categories, countries, arabicSounds, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/word');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getCategories();
    props.getCountries();
    props.getArabicSounds();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...wordEntity,
        ...values,
        categories: mapIdList(values.categories)
      };

      if (isNew) {
        props.createEntity(entity);
      } else {
        props.updateEntity(entity);
      }
    }
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="speakArabicApp.word.home.createOrEditLabel">Create or edit a Word</h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : wordEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="word-id">ID</Label>
                  <AvInput id="word-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="nameLabel" for="word-name">
                  Name
                </Label>
                <AvField
                  id="word-name"
                  type="text"
                  name="name"
                  validate={{
                    required: { value: true, errorMessage: 'This field is required.' }
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label for="word-category">Category</Label>
                <AvInput
                  id="word-category"
                  type="select"
                  multiple
                  className="form-control"
                  name="categories"
                  value={wordEntity.categories && wordEntity.categories.map(e => e.id)}
                >
                  <option value="" key="0" />
                  {categories
                    ? categories.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="word-country">Country</Label>
                <AvInput id="word-country" type="select" className="form-control" name="country.id">
                  <option value="" key="0" />
                  {countries
                    ? countries.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/word" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">Back</span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp; Save
              </Button>
            </AvForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  categories: storeState.category.entities,
  countries: storeState.country.entities,
  arabicSounds: storeState.arabicSound.entities,
  wordEntity: storeState.word.entity,
  loading: storeState.word.loading,
  updating: storeState.word.updating,
  updateSuccess: storeState.word.updateSuccess
});

const mapDispatchToProps = {
  getCategories,
  getCountries,
  getArabicSounds,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(WordUpdate);
