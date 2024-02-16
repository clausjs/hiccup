import { useMemo } from 'react'
import { Card } from 'components/Card'
import { Icon } from 'components/common/Icon'
import { triggerEdit } from 'components/EditLinkModal'
import styles from './index.module.css'
import { LinkEntityWithIcon } from 'modules/config/types'
import { DEFAULT_LINK } from 'modules/config'
import { transformEntityToFields } from 'components/EditLinkModal/transforms'
import { EditModalField } from 'components/EditLinkModal/EditLinkModal'
import { DropProps } from 'components/common/Drop'
import { classNames } from 'modules/utils'
import FontAwesomeIcon, { FontAwesomeIconName } from 'components/common/Icon/FontAwesomeIcon'

interface EditContainerProps extends DropProps<HTMLDivElement> {
  onEdit: (fields: EditModalField[]) => void
  onDelete: () => void
  link: LinkEntityWithIcon;
  editing: boolean
}

interface CategoryCardProps extends EditContainerProps {
  editing: boolean;
}

const CategoryCard = ({ link, editing, ...editProps }: CategoryCardProps) => {
  const { name, icon, iconSize, link: linkUrl } = link;

  let iconContent: React.ReactNode | undefined;
  if (icon) {
    if (typeof icon === 'string') {
      iconContent = <FontAwesomeIcon icon={(icon as FontAwesomeIconName)} size={iconSize} />;
    } else {
      iconContent = <img src={icon.url} alt={name} style={{ width: `${iconSize ?? 16}px`, height: `${iconSize ?? 16}px` }} />;
    }
  }

  return (
    <Card
      href={!editing && linkUrl}
      className={styles.container}
      link={link}
      data-testid="category-card"
    >
      <div className={styles.categoryCardContent}>
        <div className={styles.categoryCardLink}>
          <span className={styles.name}>{name}</span>
          <span className={styles.link} style={iconSize ? {} : { whiteSpace: 'nowrap' }}>{linkUrl}</span>
        </div>
        {iconContent && <div className={styles.categoryLinkIconContainer}>
          {iconContent}
        </div>}
      </div>
      <EditContainer editing={editing} {...editProps} link={link} />
    </Card>
  )
}

const EditContainer = ({
  onEdit,
  onDelete,
  link,
  editing,
  draggingOverDocument,
  dragging,
  dropRef,
  ...dropProps
}: EditContainerProps) => {
  const linkFields = useMemo(
    () => ({
      ...DEFAULT_LINK,
      ...link,
    }),
    [link]
  )

  const hidden = !(editing || draggingOverDocument)

  return (
    <div
      className={classNames([
        styles['edit-container'],
        [hidden, 'hide'],
        [draggingOverDocument, 'dragging'],
        [dragging, 'highlight'],
      ])}
      ref={dropRef}
      {...dropProps}
    >
      {draggingOverDocument ? (
        <Icon icon="earth" className={styles['edit-icon']} />
      ) : (
        <>
          <Icon
            icon="edit"
            size={15}
            as="button"
            className={styles['edit-icon']}
            onClick={() =>
              triggerEdit({
                fields: transformEntityToFields(linkFields),
                onSave: onEdit,
                title: `Edit link`,
              })
            }
          />
          <Icon
            icon="trash"
            size={15}
            as="button"
            className={styles['delete-icon']}
            onClick={onDelete}
          />
        </>
      )}
    </div>
  )
}

export { CategoryCard, CategoryCard as default }
