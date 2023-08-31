import React from 'react'
import { InjectedModalProps, Modal } from '@pancakeswap/uikit'
import { useTranslation } from '@pancakeswap/localization'
import { ContextApi } from '@pancakeswap/localization/types'
import useEditProfile, { Views } from './reducer'
import StartView from './StartView'
import PauseProfileView from './PauseProfileView'
import ChangeProfilePicView from './ChangeProfilePicView'
import ApproveSobaView from './ApproveSobaView'

type EditProfileModalProps = InjectedModalProps

const viewTitle = (t: ContextApi['t'], currentView: Views) => {
  switch (currentView) {
    case Views.START:
      return t('Edit Profile')
    case Views.CHANGE:
      return t('Change Profile Pic')
    case Views.REMOVE:
      return t('Remove Profile Pic')
    case Views.APPROVE:
      return t('Enable SOBA')
    default:
      return ''
  }
}

const EditProfileModal: React.FC<EditProfileModalProps> = ({ onDismiss }) => {
  const { currentView, goToChange, goToRemove, goToApprove, goPrevious } = useEditProfile()
  const { t } = useTranslation()

  const isStartView = currentView === Views.START
  const handleBack = isStartView ? null : () => goPrevious()

  return (
    <Modal title={viewTitle(t, currentView)} onBack={handleBack} onDismiss={onDismiss} hideCloseButton={!isStartView}>
      <div style={{ maxWidth: '400px' }}>
        {currentView === Views.START && (
          <StartView goToApprove={goToApprove} goToChange={goToChange} goToRemove={goToRemove} onDismiss={onDismiss} />
        )}
        {currentView === Views.REMOVE && <PauseProfileView onDismiss={onDismiss} />}
        {currentView === Views.CHANGE && <ChangeProfilePicView onDismiss={onDismiss} />}
        {currentView === Views.APPROVE && <ApproveSobaView goToChange={goToChange} onDismiss={onDismiss} />}
      </div>
    </Modal>
  )
}

export default EditProfileModal
