import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IWord } from 'app/shared/model/word.model';
import { getEntities as getWords } from 'app/entities/word/word.reducer';
import { getEntity, updateEntity, createEntity, reset } from './arabic-sound.reducer';
import { IArabicSound } from 'app/shared/model/arabic-sound.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IArabicSoundUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ArabicSoundUpdate = (props: IArabicSoundUpdateProps) => {
  const [idsword, setIdsword] = useState([]);
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { arabicSoundEntity, words, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/arabic-sound');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getWords();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...arabicSoundEntity,
        ...values,
        words: mapIdList(values.words)
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
          <h2 id="speakArabicApp.arabicSound.home.createOrEditLabel">Create or edit a ArabicSound</h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : arabicSoundEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="arabic-sound-id">ID</Label>
                  <AvInput id="arabic-sound-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="nameLabel" for="arabic-sound-name">
                  Name
                </Label>
                <AvField
                  id="arabic-sound-name"
                  type="text"
                  name="name"
                  validate={{
                    required: { value: true, errorMessage: 'This field is required.' }
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="descriptionLabel" for="arabic-sound-description">
                  Description
                </Label>
                <AvField id="arabic-sound-description" type="text" name="description" />
              </AvGroup>
              <AvGroup>
                <Label for="arabic-sound-word">Word</Label>
                <AvInput
                  id="arabic-sound-word"
                  type="select"
                  multiple
                  className="form-control"
                  name="words"
                  value={arabicSoundEntity.words && arabicSoundEntity.words.map(e => e.id)}
                >
                  <option value="" key="0" />
                  {words
                    ? words.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/arabic-sound" replace color="info">
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
  words: storeState.word.entities,
  arabicSoundEntity: storeState.arabicSound.entity,
  loading: storeState.arabicSound.loading,
  updating: storeState.arabicSound.updating,
  updateSuccess: storeState.arabicSound.updateSuccess
});

const mapDispatchToProps = {
  getWords,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ArabicSoundUpdate);
