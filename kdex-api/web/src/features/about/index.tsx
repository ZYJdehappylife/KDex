/*
Copyright (C) 2023-2026 QuantumNous

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program. If not, see <https://www.gnu.org/licenses/>.

For commercial licensing, please contact support@quantumnous.com
*/
import { useQuery } from '@tanstack/react-query'
import { Construction } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { PublicLayout } from '@/components/layout'
import { RichContent } from '@/components/rich-content'
import { Skeleton } from '@/components/ui/skeleton'
import { isHttpUrl, isLikelyHtml } from '@/lib/content-format'

import { getAboutContent } from './api'

function EmptyAboutState() {
  const { t } = useTranslation()
  const currentYear = new Date().getFullYear()

  return (
<div className='flex min-h-[60vh] items-center justify-center p-6 md:p-8'>
  <div className='w-full max-w-3xl space-y-8 text-center'>

    {/* Header */}
    <div className='space-y-4'>
      <div className='flex justify-center'>
        <div className='flex h-20 w-20 items-center justify-center rounded-2xl bg-muted'>
          <Construction className='h-10 w-10 text-muted-foreground' />
        </div>
      </div>

      <div className='space-y-2'>
        <h2 className='text-2xl font-bold tracking-tight'>
          KDex API
        </h2>

        <p className='mx-auto max-w-xl text-muted-foreground'>
          高性能 AI API 聚合与管理平台，支持多种大语言模型接口统一管理。
        </p>

        <p className='mx-auto max-w-xl text-sm text-muted-foreground'>
          本项目基于开源 API 管理平台进行二次开发，并持续优化功能与用户体验。
        </p>
      </div>
    </div>


    {/* Project Information */}
    <div className='mx-auto w-full max-w-2xl rounded-xl border bg-card p-6 text-left shadow-sm'>

      <div className='mb-5 space-y-1'>
        <h3 className='text-lg font-semibold'>
          项目信息
        </h3>

        <p className='text-sm text-muted-foreground'>
          KDex API - AI API Gateway & Management Platform
        </p>
      </div>


      <div className='space-y-4 text-sm'>


        {/* Repository */}
        <div className='flex flex-col gap-1 sm:flex-row sm:items-center'>
          <span className='font-medium sm:w-32'>
            开源地址
          </span>

          <a
            href='https://github.com/你的仓库地址'
            target='_blank'
            rel='noopener noreferrer'
            className='text-primary break-all hover:underline'
          >
            https://github.com/你的仓库地址
          </a>
        </div>


        {/* Project */}
        <div className='flex flex-col gap-1 sm:flex-row sm:items-center'>
          <span className='font-medium sm:w-32'>
            项目名称
          </span>

          <span className='text-muted-foreground'>
            KDex API
          </span>
        </div>


        {/* Version */}
        <div className='flex flex-col gap-1 sm:flex-row sm:items-center'>
          <span className='font-medium sm:w-32'>
            当前版本
          </span>

          <span className='text-muted-foreground'>
            v1.0.0
          </span>
        </div>


        {/* License */}
        <div className='flex flex-col gap-1 sm:flex-row sm:items-center'>
          <span className='font-medium sm:w-32'>
            开源协议
          </span>

          <span className='text-muted-foreground'>
            AGPL-3.0
          </span>
        </div>


        {/* Copyright */}
        <div className='flex flex-col gap-1 sm:flex-row sm:items-center'>
          <span className='font-medium sm:w-32'>
            Copyright
          </span>

          <span className='text-muted-foreground'>
            © {currentYear} KDex API Team
          </span>
        </div>

      </div>
    </div>



    {/* Attribution */}
    <div className='space-y-3 text-sm text-muted-foreground'>

      <p>
        KDex API 基于开源项目进行开发，
        感谢所有开源社区贡献者。
      </p>


      <p>
        本项目遵循 AGPL-3.0 开源协议，
        使用及二次开发请遵守相关协议要求。
      </p>


      <p className='pt-2'>
        KDex API 致力于提供稳定、安全、高性能的 AI API 管理服务。
      </p>

    </div>


  </div>
</div>
  )
}

export function About() {
  const { t } = useTranslation()
  const { data, isLoading } = useQuery({
    queryKey: ['about-content'],
    queryFn: getAboutContent,
  })

  const rawContent = data?.data?.trim() ?? ''
  const hasContent = rawContent.length > 0
  const isUrl = hasContent && isHttpUrl(rawContent)
  const contentIsHtml = hasContent && isLikelyHtml(rawContent)

  if (isLoading) {
    return (
      <PublicLayout>
        <div className='mx-auto flex max-w-4xl flex-col gap-4 py-12'>
          <Skeleton className='h-8 w-[45%]' />
          <Skeleton className='h-4 w-full' />
          <Skeleton className='h-4 w-[90%]' />
          <Skeleton className='h-4 w-[80%]' />
        </div>
      </PublicLayout>
    )
  }

  if (!hasContent) {
    return (
      <PublicLayout>
        <EmptyAboutState />
      </PublicLayout>
    )
  }

  if (isUrl) {
    return (
      <PublicLayout showMainContainer={false}>
        <iframe
          src={rawContent}
          className='h-[calc(100vh-3.5rem)] w-full border-0'
          title={t('About')}
          sandbox='allow-forms allow-popups allow-popups-to-escape-sandbox allow-scripts'
        />
      </PublicLayout>
    )
  }

  if (contentIsHtml) {
    return (
      <PublicLayout showMainContainer={false}>
        <RichContent
          mode='html'
          htmlVariant='isolated'
          content={rawContent}
          className='prose-neutral dark:prose-invert max-w-none'
        />
      </PublicLayout>
    )
  }

  return (
    <PublicLayout>
      <div className='mx-auto max-w-6xl px-4 py-8'>
        <RichContent
          mode='markdown'
          content={rawContent}
          className='prose-neutral dark:prose-invert max-w-none'
        />
      </div>
    </PublicLayout>
  )
}
